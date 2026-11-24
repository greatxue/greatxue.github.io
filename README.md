# Zhongkai Xue

Personal website hosted on GitHub Pages.

## 添加 Notes 条目

编辑 `_data/writing.yml`，每篇文章一项，列表顺序就是首页和 `/blog/` 的展示顺序。首页在 Photos 下方显示标题、可选引言和日期，整条可点击；`/blog/` 保留封面画廊。文章可以发布在 Notion 或其他网站，条目和归档页封面会直接打开 `external_url`。

```yaml
- title: "記一些不確定的夏天"
  lang: zh-Hant
  date: "2025-06"
  excerpt: "城市的夜晚看不到星星，只有彎彎的月牙遙遠地亮起，勾勒出一個個皎潔的謊言。"
  cover: "/assets/covers/uncertain-summers-tram.png"
  cover_position: "right center"
  cover_alt: "夜色中的復古電車"
  cover_width: 2000
  cover_height: 1160
  external_url: "https://app.notion.com/p/2291de8db94980f0a8f7c87f7f910344?source=copy_link"
```

日期可填写 `YYYY-MM`（显示为 `Jun 2025`）或 `YYYY-MM-DD`（显示为 `Dec 12, 2025`），省略则不显示。只知道月份时无需补写日期。

`excerpt` 是可选的文章原文引言，显示在首页标题与日期之间，不额外添加引号。首页以单列文字和留白区分条目，与 Notes 标题左对齐；整条可点击，悬停或键盘聚焦时显示浅暖色底并将标题变为主题色。省略引言时只显示标题和日期。

归档页封面保存在 `assets/covers/`；宽高填写原图尺寸。归档画廊沿用 4∶3 封面框，默认居中裁切；可以用 `cover_position` 调整取景，例如 `right center` 保留右侧画面。原图文件保持不变。省略 `cover` 时会用文章标题生成文字封面。`cover_alt` 是图片说明，英文文章可省略 `lang`。

Notes 仅展示清单中的条目，不自动加入示例。首页列表不加载封面或横向滚动脚本。归档页横向内容超出可视区域时会显示滚动按钮，也支持触控板、触屏和键盘方向键。

## 放摄影作品

将网页用的小图放进 `assets/photography/`，然后编辑 `_data/photography.yml`，按地点组织相簿。原片另外保存，网站仅使用缩小后的图片。

```yaml
- title: "Oxford, UK"
  photos:
    - src: "/assets/photography/oxford-01.jpg"
      alt: "简短描述照片中的画面"
      width: 800
      height: 530
```

每个相簿的第一张照片作为首页封面。点击封面或地点名称，会打开相簿，按 `photos` 的顺序横向浏览；支持触控板、触屏、左右按钮和键盘方向键。按 Escape、点击 `[close]` 或弹窗外侧即可关闭。

`width` 和 `height` 填网页图片的实际像素尺寸，图片按原比例完整展示。相簿内仅展示小图，不提供单张放大。新增地点时，在清单中追加一个包含 `title` 和 `photos` 的条目即可。

所有相片均使用长边 800 像素的网页版本，并延迟加载。

## 论文摘要来源

首页摘要采用下列原文版本，保留原文措辞，仅规范网页空白及资源链接的显示。作者署名和原文链接随论文展示；各摘要保留其原有许可，不改变网站其他内容的许可。

| 论文 | 原文版本 | 许可 |
| --- | --- | --- |
| UniForget | [arXiv v1](https://arxiv.org/abs/2611.04467v1) | [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) |
| RoboMemory | [arXiv v9](https://arxiv.org/abs/2508.01415v9) | [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) |
| MJ-VIDEO | [arXiv v3](https://arxiv.org/abs/2502.01719v3) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| GraphAbstract | [arXiv v1](https://arxiv.org/abs/2510.24788v1) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Political-LLM | [官方项目原文](https://github.com/CS-FSU/political-llm/blob/master/index.html)，与 [arXiv v1](https://arxiv.org/abs/2412.06864v1) 摘要一致 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |

## 标识来源

页面上的学校、机构和浏览器标签图标均从项目的 `assets/logos/` 加载；页首社交图标保存在 `_includes/icons/`，构建时直接内嵌 SVG。它们不再依赖外部图床，替换图标时保留对应文件名即可。

下列文件由本站原有图床地址原样保存，图片内容未修改：

| 本地文件 | 原始地址 |
| --- | --- |
| `assets/logos/casia.jpg` | [原图](https://pic1.imgdb.cn/i/0346nbRJlSU7LNklugAT2J.jpg) |
| `assets/logos/cuhk-shenzhen.png` | [原图](https://pic1.imgdb.cn/i/0346nbRSpaFhCtVlKYENbu.png) |
| `assets/logos/yale.png` | [原图](https://pic1.imgdb.cn/i/0346nbS21ZBGl45XTiViBE.png) |
| `assets/logos/microsoft.png` | [原图](https://pic1.imgdb.cn/i/0346nbRbbZU2gQHHoaOhX5.png) |
| `assets/logos/bytedance.png` | [原图](https://pic1.imgdb.cn/i/0346nbRGwGvrhbSQJ2vLCj.png) |
| `assets/logos/favicon.png` | [原图](https://pic1.imgdb.cn/item/67f046810ba3d5a1d7ed807c.png) |

`assets/logos/ucas-emblem.png` 取自[中国科学院大学官方形象标识页](https://onestop.ucas.edu.cn/home/info/6b9e95dc-5785-4eee-b25f-1f884698cfc3)提供的[标准 Logo 素材包](https://onestop.ucas.edu.cn/Content/Upload/2020/9/1.zip)。该圆形徽标是校名组合标识中的图形部分，文件未作修改。

`assets/logos/oxford-crest.svg` 为 [Wikimedia Commons 的牛津大学盾徽](https://commons.wikimedia.org/wiki/File:Coat_of_arms_of_the_University_of_Oxford.svg)，原作者 ChevronTango，当前版本由 Jonas Magnus Lystad 修订，采用 [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) 许可。原始 SVG 未经修改，画布透明。

页首 Google Scholar、GitHub、X、Threads 和小红书标志取自 [Simple Icons 16.34.0](https://github.com/simple-icons/simple-icons/tree/16.34.0/icons)，采用 [CC0 1.0](https://github.com/simple-icons/simple-icons/blob/16.34.0/LICENSE.md) 许可，SVG 路径保持不变。Email 使用 [Bootstrap Icons 1.13.1 的 envelope-fill](https://github.com/twbs/icons/blob/v1.13.1/icons/envelope-fill.svg)，完整 MIT 许可位于 `assets/licenses/bootstrap-icons.txt`。

小红书使用上述 Simple Icons 原始字标路径，等比例缩放后镂空于圆角方形中，颜色继承页面链接主题色。这是为本站适配的单色版本，圆角背景和 SVG mask 为本站添加。

## 中文姓名字体

姓名使用 [TrionesType 朱雀仿宋 v0.212](https://github.com/TrionesType/zhuque/releases/tag/v0.212)。`assets/fonts/name-fangsong.woff2` 为仅包含“薛中凱”及必要字形的子集，衍生字族重命名为 Zhongkai Fangsong Preview；完整 SIL Open Font License 1.1 授权保存在 `assets/licenses/zhuque-fangsong.txt`。字体随网页本地加载。
