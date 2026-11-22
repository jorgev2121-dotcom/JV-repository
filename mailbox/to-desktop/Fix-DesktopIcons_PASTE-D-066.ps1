# Fix-DesktopIcons_PASTE-D-066.ps1
# PASTE-D-066 | 2026-11-22 | Cloud -> Desktop executor (RAMBO)
# What it does: (1) makes desktop icons regular (Medium) size, (2) moves ALL desktop icons
# onto the RIGHT-hand monitor, in the same order, leaving room for the RAM widget.
# SAFE BY DEFAULT: running it with no switch changes NOTHING. It only counts and saves a backup.
#   .\Fix-DesktopIcons_PASTE-D-066.ps1           -> dry run (backup + report only)
#   .\Fix-DesktopIcons_PASTE-D-066.ps1 -Apply    -> do it
#   .\Fix-DesktopIcons_PASTE-D-066.ps1 -Undo     -> put icons and size back from the latest backup
# STATUS: written in the cloud, NOT yet run on Jorge's PC. UNVERIFIED until the desktop prints the VERIFY line.
param([switch]$Apply,[switch]$Undo,[int]$RightMargin=170)
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Windows.Forms
$cs=@'
using System; using System.Text; using System.Runtime.InteropServices;
public static class DI {
 [DllImport("user32.dll",CharSet=CharSet.Unicode)] public static extern IntPtr FindWindow(string c,string w);
 [DllImport("user32.dll",CharSet=CharSet.Unicode)] public static extern IntPtr FindWindowEx(IntPtr p,IntPtr a,string c,string w);
 [DllImport("user32.dll")] public static extern IntPtr SendMessage(IntPtr h,int m,IntPtr w,IntPtr l);
 [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr h,out uint pid);
 [DllImport("user32.dll")] public static extern bool ClientToScreen(IntPtr h,ref POINT p);
 [DllImport("user32.dll")] public static extern int GetWindowLong(IntPtr h,int i);
 [DllImport("kernel32.dll")] public static extern IntPtr OpenProcess(uint a,bool b,uint pid);
 [DllImport("kernel32.dll")] public static extern IntPtr VirtualAllocEx(IntPtr p,IntPtr a,uint s,uint t,uint pr);
 [DllImport("kernel32.dll")] public static extern bool VirtualFreeEx(IntPtr p,IntPtr a,uint s,uint t);
 [DllImport("kernel32.dll")] public static extern bool ReadProcessMemory(IntPtr p,IntPtr a,byte[] b,int s,out int r);
 [DllImport("kernel32.dll")] public static extern bool WriteProcessMemory(IntPtr p,IntPtr a,byte[] b,int s,out int w);
 [DllImport("kernel32.dll")] public static extern bool CloseHandle(IntPtr h);
 [StructLayout(LayoutKind.Sequential)] public struct POINT{public int X;public int Y;}
 public class Item{public string Name;public int X;public int Y;public int Index;}
 public static IntPtr FindList(){
  IntPtr def=IntPtr.Zero; IntPtr prog=FindWindow("Progman",null);
  if(prog!=IntPtr.Zero) def=FindWindowEx(prog,IntPtr.Zero,"SHELLDLL_DefView",null);
  if(def==IntPtr.Zero){ IntPtr w=IntPtr.Zero;
   while((w=FindWindowEx(IntPtr.Zero,w,"WorkerW",null))!=IntPtr.Zero){
    def=FindWindowEx(w,IntPtr.Zero,"SHELLDLL_DefView",null); if(def!=IntPtr.Zero)break; } }
  if(def==IntPtr.Zero) return IntPtr.Zero;
  return FindWindowEx(def,IntPtr.Zero,"SysListView32",null);
 }
 public static Item[] ReadAll(IntPtr lv){
  uint pid; GetWindowThreadProcessId(lv,out pid);
  IntPtr ph=OpenProcess(0x438,false,pid); if(ph==IntPtr.Zero) throw new Exception("Cannot open Explorer. Run PowerShell as the same user, not as another account.");
  IntPtr rem=VirtualAllocEx(ph,IntPtr.Zero,4096,0x3000,4);
  int n=(int)SendMessage(lv,0x1004,IntPtr.Zero,IntPtr.Zero);
  Item[] r=new Item[n];
  for(int i=0;i<n;i++){
   int rd; byte[] pt=new byte[8];
   SendMessage(lv,0x1010,(IntPtr)i,rem); ReadProcessMemory(ph,rem,pt,8,out rd);
   byte[] li=new byte[88];
   BitConverter.GetBytes(1).CopyTo(li,0); BitConverter.GetBytes(i).CopyTo(li,4);
   BitConverter.GetBytes(rem.ToInt64()+256).CopyTo(li,24); BitConverter.GetBytes(250).CopyTo(li,32);
   int wr; WriteProcessMemory(ph,rem+0,li,88,out wr);
   SendMessage(lv,0x1073,(IntPtr)i,rem);
   byte[] tx=new byte[512]; ReadProcessMemory(ph,new IntPtr(rem.ToInt64()+256),tx,512,out rd);
   string name=Encoding.Unicode.GetString(tx); int z=name.IndexOf('\0'); if(z>=0)name=name.Substring(0,z);
   r[i]=new Item{Name=name,X=BitConverter.ToInt32(pt,0),Y=BitConverter.ToInt32(pt,4),Index=i};
  }
  VirtualFreeEx(ph,rem,0,0x8000); CloseHandle(ph); return r;
 }
 public static void SetPos(IntPtr lv,int i,int x,int y){
  SendMessage(lv,0x100F,(IntPtr)i,(IntPtr)(((y&0xFFFF)<<16)|(x&0xFFFF)));
 }
 public static int[] Spacing(IntPtr lv){ int v=(int)SendMessage(lv,0x1033,IntPtr.Zero,IntPtr.Zero); return new int[]{v&0xFFFF,(v>>16)&0xFFFF}; }
}
'@
Add-Type -TypeDefinition $cs
$dir="$env:USERPROFILE\OneDrive\Documents\Reports\Undo_Manifests"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$regKey='HKCU:\Software\Microsoft\Windows\Shell\Bags\1\Desktop'
function Get-List { $l=[DI]::FindList(); if($l -eq [IntPtr]::Zero){ throw 'Desktop icon list not found.' }; return $l }
function Wait-List { for($i=0;$i -lt 40;$i++){ Start-Sleep 1; $l=[DI]::FindList(); if($l -ne [IntPtr]::Zero -and ([DI]::ReadAll($l)).Count -gt 0){ Start-Sleep 2; return $l } }; throw 'Explorer did not come back in 40 seconds.' }
function Restart-Explorer { Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue; Start-Sleep 3; if(-not (Get-Process explorer -ErrorAction SilentlyContinue)){ Start-Process explorer.exe } }

if($Undo){
  $csv=Get-ChildItem $dir -Filter 'Desktop-Icons_*.csv' | Sort-Object LastWriteTime | Select-Object -Last 1
  $reg=Get-ChildItem $dir -Filter 'Desktop-Icons_*.reg' | Sort-Object LastWriteTime | Select-Object -Last 1
  if(-not $csv){ throw 'No backup csv found in Undo_Manifests.' }
  if($reg){ reg import $reg.FullName | Out-Null }
  Restart-Explorer; $lv=Wait-List
  $now=[DI]::ReadAll($lv); $saved=Import-Csv $csv.FullName; $moved=0
  foreach($s in $saved){ $m=$now | Where-Object { $_.Name -eq $s.Name } | Select-Object -First 1; if($m){ [DI]::SetPos($lv,$m.Index,[int]$s.X,[int]$s.Y); $moved++ } }
  Write-Host "UNDO: put $moved of $($saved.Count) icons back from $($csv.Name)"
  return
}

$lv=Get-List
$items=[DI]::ReadAll($lv)
$stamp=Get-Date -Format 'yyyy-MM-dd_HHmm'
$csvPath="$dir\Desktop-Icons_$stamp.csv"
$items | Select-Object Name,X,Y | Export-Csv $csvPath -NoTypeInformation -Encoding UTF8
try { reg export 'HKCU\Software\Microsoft\Windows\Shell\Bags\1\Desktop' "$dir\Desktop-Icons_$stamp.reg" /y | Out-Null } catch {}
Set-Content "$dir\Rollback_DesktopIcons_$stamp.ps1" "& '$PSCommandPath' -Undo"
$screens=[System.Windows.Forms.Screen]::AllScreens | Sort-Object { $_.Bounds.X }
$right=$screens | Select-Object -Last 1
Write-Host "Icons found: $($items.Count). Monitors: $($screens.Count). Right monitor: $($right.DeviceName) $($right.Bounds.Width)x$($right.Bounds.Height)"
Write-Host "Backup saved: $csvPath"
if($screens.Count -lt 2){ throw 'Only one monitor detected. Nothing moved.' }
if(([DI]::GetWindowLong($lv,-16) -band 0x100) -ne 0){ throw 'Auto arrange icons is ON. Right-click desktop > View > untick Auto arrange icons, then run again.' }
if(-not $Apply){ Write-Host 'DRY RUN: nothing changed. Run again with -Apply to resize and move.'; return }

# 1. Medium icons (48). Large=96, Small=32. Explorer restarts for a few seconds.
if(-not (Test-Path $regKey)){ New-Item -Path $regKey -Force | Out-Null }
New-ItemProperty -Path $regKey -Name IconSize -Value 48 -PropertyType DWord -Force | Out-Null
Restart-Explorer; $lv=Wait-List

# 2. Lay out on the right monitor, same order (column by column).
$items=[DI]::ReadAll($lv) | Sort-Object X,Y
$sp=[DI]::Spacing($lv); $cx=[int]$sp[0]; $cy=[int]$sp[1]
if($cx -lt 40 -or $cy -lt 40){ $cx=80; $cy=90 }
$o=New-Object DI+POINT; [void][DI]::ClientToScreen($lv,[ref]$o)
$wa=$right.WorkingArea
$x0=$wa.X-$o.X+10; $y0=$wa.Y-$o.Y+5
$rows=[math]::Floor(($wa.Height-10)/$cy); $cols=[math]::Floor(($wa.Width-$RightMargin-10)/$cx)
Write-Host "Spacing ${cx}x${cy}; right screen fits $rows rows x $cols columns = $($rows*$cols) icons; need $($items.Count)"
if($items.Count -gt $rows*$cols){ throw 'Not enough room on the right screen at this size. Icons were resized but NOT moved. Run -Undo to restore.' }
for($k=0;$k -lt $items.Count;$k++){
  $col=[math]::Floor($k/$rows); $row=$k % $rows
  [DI]::SetPos($lv,$items[$k].Index,$x0+$col*$cx,$y0+$row*$cy)
}
Start-Sleep 2

# 3. VERIFY with a denominator
$chk=[DI]::ReadAll($lv); $ins=0
foreach($c in $chk){ $sx=$c.X+$o.X; $sy=$c.Y+$o.Y; if($sx -ge $right.Bounds.X -and $sx -lt $right.Bounds.Right -and $sy -ge $right.Bounds.Y -and $sy -lt $right.Bounds.Bottom){ $ins++ } }
Write-Host "VERIFY: $ins of $($chk.Count) icons are on the right screen. IconSize now $((Get-ItemProperty $regKey).IconSize). Undo: $dir\Rollback_DesktopIcons_$stamp.ps1"
