#!/usr/bin/env python3
"""Gộp index.html + css + js thành MỘT file HTML tự chứa (dùng khi nơi đăng chỉ nhận 1 file).
Dùng: python3 build.py [đường_dẫn_ra]   (mặc định dist/tiggly-blocks.html)"""
import re,sys,pathlib
root=pathlib.Path(__file__).parent
html=(root/"index.html").read_text(encoding="utf-8")
css=(root/"css/style.css").read_text(encoding="utf-8")
html=html.replace('<link rel="stylesheet" href="css/style.css">',f"<style>\n{css}</style>")
def inline(m):
    return f'<script>\n/* {m.group(1)} */\n{(root/m.group(1)).read_text(encoding="utf-8")}</script>'
import base64
html=re.sub(r'src="(img/[^"]+)"',lambda m:'src="data:image/jpeg;base64,'+base64.b64encode((root/m.group(1)).read_bytes()).decode()+'"',html)
html=re.sub(r'<script src="([^"]+)"></script>',inline,html)
out=pathlib.Path(sys.argv[1]) if len(sys.argv)>1 else root/"dist/tiggly-blocks.html"
out.parent.mkdir(parents=True,exist_ok=True);out.write_text(html,encoding="utf-8");print("OK",out,len(html),"bytes")
