"""Offline tests for vts_llm_panel: no network, no keys, no spend."""
import os
import sys
import tempfile
import unittest
from unittest import mock

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import vts_llm_panel as panel


class PanelTests(unittest.TestCase):
    def setUp(self):
        self.calls = []
        env = {"GEMINI_API_KEY": "g", "XAI_API_KEY": "x"}
        self.env = mock.patch.dict(os.environ, env, clear=True)
        self.env.start()

    def tearDown(self):
        self.env.stop()

    def fake_post(self, reply_for_gemini=None, gemini_error=None):
        def _post(url, headers, body, timeout=45):
            self.calls.append(url)
            if "generativelanguage" in url:
                if gemini_error:
                    raise gemini_error
                return {"candidates": [{"content": {"parts": [{"text": reply_for_gemini}]}}]}
            return {"choices": [{"message": {"content": "paid answer"}}]}
        return _post

    def test_gemini_first_uses_current_model_and_header_key(self):
        with mock.patch.object(panel, "_post", self.fake_post("OK")):
            name, answer = panel.ask("hi")
        self.assertEqual((name, answer), ("gemini", "OK"))
        self.assertIn("gemini-2.5-flash", self.calls[0])
        self.assertNotIn("key=", self.calls[0])

    def test_paid_fallback_blocked_without_approval(self):
        err = panel.urllib.error.HTTPError("u", 429, "quota", None, None)
        with mock.patch.object(panel, "_post", self.fake_post(gemini_error=err)):
            with self.assertRaises(RuntimeError) as ctx:
                panel.ask("hi")
        self.assertIn("grok: skipped (paid", str(ctx.exception))
        self.assertFalse(any("x.ai" in u for u in self.calls))

    def test_paid_fallback_allowed_with_approval(self):
        err = panel.urllib.error.HTTPError("u", 429, "quota", None, None)
        with tempfile.TemporaryDirectory() as d:
            with open(os.path.join(d, "RUN-1.md"), "w") as f:
                f.write("STATUS: APPROVED\n")
            with mock.patch.object(panel, "APPROVALS", d), \
                 mock.patch.object(panel, "_post", self.fake_post(gemini_error=err)):
                name, answer = panel.ask("hi", approved_run="RUN-1")
        self.assertEqual(name, "grok")

    def test_health_never_pings_paid(self):
        with mock.patch.object(panel, "_post", self.fake_post("OK")):
            rows = {r[0]: r[1] for r in panel.health()}
        self.assertEqual(rows["gemini"], "LIVE")
        self.assertEqual(rows["grok"], "KEY-SET")
        self.assertEqual(len(self.calls), 1)


if __name__ == "__main__":
    unittest.main()
