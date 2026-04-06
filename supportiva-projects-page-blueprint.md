# Supportiva.net — PROJECTS PAGE (`/projects`) — Complete Blueprint

> **Purpose**: This document is a pixel-level specification of the Supportiva Projects page so that Claude Code (or any developer) can recreate and upgrade it without accessing the live site.

---

## PAGE METADATA
- **URL**: `https://www.supportiva.net/projects`
- **Page Title** (browser tab): `Projects | Supportiva`
- **Platform**: Built on Wix
- **Total Sections**: 3 (Navbar → Hero → Project Cards → Footer)
- **Total Images on Page**: 12 (1 hero + 10 project photos + 1 footer logo)

---

## SECTION 1: NAVIGATION BAR (Global — same on all pages)

### Layout
- **Position**: Sticky/fixed at top of page
- **Background**: White or very light
- **Height**: Approximately 70–80px

### Contents (left to right)
1. **Logo** (far left):
   - Image: `Supportiva.png`
   - Dimensions: 209×209px
   - Alt text: "Supportiva.png"
   - Link: `https://www.supportiva.net` (home)
   - Source URL: `https://static.wixstatic.com/media/c1a3d4_97cb2d7a17384b06a328d6a4172ee707~mv2.png/v1/fill/w_209,h_209,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Supportiva.png`

2. **Menu Items** (horizontal, center/right):
   - `Home` → `/`
   - `Solutions` → `/solutions`
   - `Vision` → `/vision`
   - `Projects` → `/projects` ← **ACTIVE/CURRENT PAGE**
   - `The S Blog` → `/blog`
   - `More` → overflow/dropdown (no visible sub-items)

3. **No CTA button** in the navbar
4. **Accessibility note**: "Use tab to navigate through the menu items."

---

## SECTION 2: HERO BANNER

### Layout
- **Type**: Full-width image with heading text overlay
- **Width**: Full viewport width (rendered at 980px content width)
- **Height**: ~352px (image is cropped from a taller original)

### Image
- **HAS IMAGE**: ✅ YES
- **Alt text**: "Servers"
- **Description**: A wide panoramic photo of a server room / data center — rows of server racks with blue/cool lighting. The image is heavily cropped vertically (original is much taller, cropped to a landscape strip).
- **Original dimensions**: 4408×1583 (cropped region from a larger image)
- **Rendered dimensions**: 980×352px
- **Crop parameters**: `x_0, y_522, w_4408, h_1583` (cropped from ~y=522 downward)
- **Source URL**: `https://static.wixstatic.com/media/11062b_02f3dbceab3f4181a0ea4767efbf280d~mv2.jpg/v1/crop/x_0,y_522,w_4408,h_1583/fill/w_980,h_352,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Servers.jpg`
- **Note**: This is a DIFFERENT hero image from Solutions/Vision/Blog (which share the same dark corporate photo). This one is a distinct server room photo.

### Text Overlay
- **Heading (H1)**: `Projects`
- **Style**: Large white text, centered or left-aligned over the server image
- **No subtitle or body text** in the hero
- **No CTA button** in the hero

---

## SECTION 3: PROJECT CARDS

### Overall Layout
- **Structure**: Vertically stacked project entries, one after another
- **Each project card** follows a two-column layout:
  - **Left column**: Title (H2) + description text
  - **Right column**: Project photo (~379×225px)
- **Spacing**: Each project is separated by whitespace
- **Background**: White
- **Text alignment**: Left-aligned
- **Total projects**: 10

---

### PROJECT 1: Nike Turkey Migration Project

#### Title
- **Heading (H2)**: `Nike Turkey Migration Project`
- **"Nike" is a hyperlink**: Links to `https://www.linkedin.com/company/nike/`
- **"Nike" appears twice as hyperlinks** in the text (once in the title context, once in the description)

#### Description
Full text:

```
We're thrilled to announce the successful completion of a migration project for Nike Turkey stores, achieved across nine different sites and cities. This accomplishment was made possible through the collaboration of multinational teams, whose dedication and commitment have added a significant milestone to our success journey.

During this migration, our team carried out the following tasks:
• BOM Validation: Verified devices, PDUs, and cables.
• Cable Survey & Labeling: Conducted a pre-check survey, labeling all existing switches and patch panel connections to ensure systems and peripherals could be seamlessly reconnected post-migration.
• Device Decommissioning: Removed the main MDF rack network devices in each store.
• Rack & Stack: Installed brand-new switches.
• Rack Redesign: Tidied up the racks for a clean and organized look.
• Patchwork: Established connections between switches and patch panels.
• Smoke Testing: Conducted system checks to confirm all store systems and peripherals were up and ready for daily operations.

This project stands as a testament to the hard work and expertise of our engineering team.
```

- **Bullet points**: 7 items (BOM Validation, Cable Survey & Labeling, Device Decommissioning, Rack & Stack, Rack Redesign, Patchwork, Smoke Testing)
- **Bullet style**: Standard bullet character (•), not numbered

#### Image
- **HAS IMAGE**: ✅ YES
- **Filename**: `IMG_0372_edited.jpg`
- **Description**: Real photo of a network rack / server cabinet with neatly organized cables and network switches — appears to be inside a retail store's MDF room
- **Rendered dimensions**: 379×225px
- **Crop parameters**: `x_255, y_0, w_2173, h_1290`
- **Source URL**: `https://static.wixstatic.com/media/c1a3d4_b6b3ba4a72304d6da3ea0205a5488d02~mv2.jpg/v1/crop/x_255,y_0,w_2173,h_1290/fill/w_379,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_0372_edited.jpg`
- **Image position**: Right side of the text

---

### PROJECT 2: On Site - L1 Support

#### Title
- **Heading (H2)**: `On Site - L1 Support`
- **No hyperlinks** in title

#### Description
Full text:

```
Our team of help desk support engineers successfully concluded a 24-month migration project in Istanbul, Turkey, for our client. Throughout this period, their primary responsibility involved assisting the client's end users by supplying them with devices equipped with the new Windows 11 image.
```

- **No bullet points**
- **Key details**: 24-month project, Istanbul Turkey, Windows 11 image deployment

#### Image
- **HAS IMAGE**: ✅ YES
- **Filename**: `it-support-1.jpg`
- **Description**: Photo of an IT support technician working at a desk / helping a user — could be stock or real project photo
- **Rendered dimensions**: 379×225px
- **Crop parameters**: `x_0, y_93, w_1200, h_713`
- **Source URL**: `https://static.wixstatic.com/media/c1a3d4_ae9c6d1659ec4f44bb89e4b71bf8860f~mv2.jpg/v1/crop/x_0,y_93,w_1200,h_713/fill/w_379,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/it-support-1.jpg`
- **Image position**: Right side of the text

---

### PROJECT 3: Data Center Cabling Design

#### Title
- **Heading (H2)**: `Data Center Cabling Design`
- **No hyperlinks** in title

#### Description
Full text:

```
Just provide us with the cabling patch matrix, and our expert team will transform it into a masterpiece as we finalize this project at the client's data center.
```

- **Short description** — only 1 sentence
- **No bullet points**

#### Image
- **HAS IMAGE**: ✅ YES
- **Filename**: `IMG_7878.HEIC` (served as PNG)
- **Description**: Real photo showing beautifully organized data center cabling — neat bundles of cables running between patch panels, likely fiber or Cat6 in a professional data center environment
- **Rendered dimensions**: 379×225px
- **Crop parameters**: `x_0, y_1117, w_3024, h_1798`
- **Source URL**: `https://static.wixstatic.com/media/c1a3d4_4335997e3ca74e98ba37a32ccd74bae6~mv2.png/v1/crop/x_0,y_1117,w_3024,h_1798/fill/w_379,h_225,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_7878_HEIC.png`
- **Image position**: Right side of the text

---

### PROJECT 4: Network Devices Decommissioning — Go Green

#### Title
- **Heading (H2)**: `Network devices Decommissioning Go Green There Is No Planet B`
- **No hyperlinks** in title
- **Note**: Title is quite long and has an environmental/sustainability theme

#### Description
Full text:

```
As network equipment nears the end of its useful life, our role as a reliable partner intensifies in minimizing electronic waste and lessening environmental harm. We prioritize secure data deletion to safeguard confidential information before entrusting devices to our esteemed recycling collaborator, who guarantees their eco-friendly disposal.
```

- **No bullet points**
- **Key themes**: E-waste, secure data deletion, eco-friendly disposal, recycling partner

#### Image
- **HAS IMAGE**: ✅ YES
- **Filename**: `WhatsApp Image 2023-12-25 at 21.54.24.jpeg`
- **Description**: Real photo showing stacked/piled decommissioned network equipment (switches, routers) ready for recycling — looks like it was taken with a phone (WhatsApp origin)
- **Rendered dimensions**: 379×225px
- **Crop parameters**: `x_0, y_159, w_2048, h_1217`
- **Source URL**: `https://static.wixstatic.com/media/c1a3d4_a4bb6994020a42449c62a24639d95c8b~mv2.jpeg/v1/crop/x_0,y_159,w_2048,h_1217/fill/w_379,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202023-12-25%20at%2021_54_24.jpeg`
- **Image position**: Right side of the text

---

### PROJECT 5: Palo Alto PA-440 Firewall Installation

#### Title
- **Heading (H2)**: `Paloalto  PA-440 Firewall Installation`
- **Note**: "Paloalto" is one word (typo — should be "Palo Alto"), and there's a double space before "PA-440"
- **No hyperlinks** in title

#### Description
Full text:

```
Our Infra team successfully finished installing Paltoalto firewalls at the client data center.

A part of the installation process was to mount the devices to the rack mount kit and rack it
```

- **Note**: "Paltoalto" is misspelled (should be "Palo Alto")
- **No bullet points**
- **2 short paragraphs**

#### Image
- **HAS IMAGE**: ✅ YES
- **Filename**: `IMG_1002_edited.png`
- **Description**: Real photo showing a Palo Alto PA-440 firewall unit mounted in a server rack — close-up of the device with rack mount kit visible
- **Rendered dimensions**: 379×225px
- **Crop parameters**: `x_0, y_278, w_1341, h_797`
- **Source URL**: `https://static.wixstatic.com/media/c1a3d4_3bb4867580e24dfba5dcaa58b123f8b4~mv2.png/v1/crop/x_0,y_278,w_1341,h_797/fill/w_379,h_225,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_1002_edited.png`
- **Image position**: Right side of the text

---

### PROJECT 6: Network Upgrade at MFG Site

#### Title
- **Heading (H2)**: `Network Upgrade at MFG Site`
- **No hyperlinks** in title

#### Description
Full text:

```
We recently completed an impactful project for a client at their manufacturing site, focusing on improving their network infrastructure. Our team successfully configured and installed new network devices, including Cisco access points, to enhance connectivity and performance across the site.

Highlights of the project:
Received and configured various network devices.
Installed and secured Cisco access points for better coverage.
Worked closely with the client to meet their specific needs and ensure minimal disruption during the upgrade.

We thank our dedicated team for their hard work and the client for trusting us with this crucial task. We're proud of what we've achieved together and look forward to more successful projects!
```

- **Highlight items**: 3 items listed (no bullet characters, just line breaks)
- **Key tech**: Cisco access points, network devices

#### Image
- **HAS IMAGE**: ✅ YES
- **Filename**: `Cisco Project.jpeg`
- **Description**: Real photo showing Cisco networking equipment — possibly access points or switches laid out on a surface or being configured, with packaging visible
- **Rendered dimensions**: 379×225px
- **Crop parameters**: `x_0, y_156, w_2000, h_1187`
- **Source URL**: `https://static.wixstatic.com/media/c1a3d4_c0ad48bd90f74227ac45f698ac0ec9f2~mv2.jpeg/v1/crop/x_0,y_156,w_2000,h_1187/fill/w_379,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Cisco%20Project.jpeg`
- **Image position**: Right side of the text

---

### PROJECT 7: Racking & Stacking

#### Title
- **Heading (H2)**: `Racking & Stacking`
- **No hyperlinks** in title

#### Description
Full text:

```
Our Infra squad racked & stacked a 60 servers at the client data center in Turkey - Istanbul.
```

- **Very short** — single sentence
- **Note**: "a 60 servers" has a grammatical error (should be "60 servers")
- **Key details**: 60 servers, Turkey, Istanbul

#### Image
- **HAS IMAGE**: ✅ YES
- **Filename**: `IMG_7732.HEIC` (served as PNG)
- **Description**: Real photo of server racks in a data center — shows rows of racked servers, likely during or after the racking process
- **Rendered dimensions**: 379×225px
- **Crop parameters**: None (fill only)
- **Source URL**: `https://static.wixstatic.com/media/c1a3d4_20c689bbd13e4806bea04f7a0d8cd8c8~mv2.png/v1/fill/w_379,h_225,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_7732_HEIC.png`
- **Image position**: Right side of the text
- **SPECIAL NOTE**: This image is wrapped in an `<a>` link that points back to `/projects` (self-linking — likely unintentional)

---

### PROJECT 8: WiFi Survey

#### Title
- **Heading (H2)**: `Wifi Survey`
- **No hyperlinks** in title

#### Description
Full text:

```
Our team of skilled wireless engineers conducted a comprehensive WiFi survey at the client's manufacturing site, resulting in meticulously crafted WiFi Heatmaps for unparalleled site coverage optimization
```

- **Single paragraph**, no bullet points
- **Key terms**: WiFi survey, manufacturing site, WiFi Heatmaps, coverage optimization

#### Image
- **HAS IMAGE**: ✅ YES
- **Filename**: `WIFI HEATMAP_edited.jpg`
- **Description**: Screenshot/image of a WiFi heatmap visualization — shows a floor plan with color-coded signal strength overlay (red/green/blue zones indicating WiFi coverage levels)
- **Rendered dimensions**: 379×225px
- **Crop parameters**: `x_0, y_201, w_616, h_366`
- **Source URL**: `https://static.wixstatic.com/media/c1a3d4_d014851316b746028f56f9ec0ac2b744~mv2.jpg/v1/crop/x_0,y_201,w_616,h_366/fill/w_379,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WIFI%20HEATMAP_edited.jpg`
- **Image position**: Right side of the text

---

### PROJECT 9: Network Devices Rental

#### Title
- **Heading (H2)**: `Network devices Rental`
- **No hyperlinks** in title

#### Description
Full text:

```
The delivery of new devices to our client was unfortunately delayed. However, at Supportiva, we were quick to respond to this challenge. By providing a range of network devices for rent, we were able to significantly save our client both time and headaches. This stopgap solution enabled the client to activate their site seamlessly while awaiting the arrival of the delayed shipment.
```

- **No bullet points**
- **Key concept**: Rental/loaner devices as a stopgap solution

#### Image
- **HAS IMAGE**: ✅ YES
- **Filename**: `WhatsApp Image 2023-12-25 at 22.21.41.jpeg`
- **Description**: Real photo of network devices (switches/routers) — possibly rental equipment laid out or boxed, phone camera photo (WhatsApp origin)
- **Rendered dimensions**: 379×225px
- **Crop parameters**: `x_0, y_80, w_1024, h_609`
- **Source URL**: `https://static.wixstatic.com/media/c1a3d4_6cc1447ce76c458f824745dc81e31f44~mv2.jpeg/v1/crop/x_0,y_80,w_1024,h_609/fill/w_379,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202023-12-25%20at%2022_21_41.jpeg`
- **Image position**: Right side of the text

---

### PROJECT 10: Windows 10 to Windows 11 Migration

#### Title
- **Heading (H2)**: `🚀Successful Migration Alert: Windows 10 to Windows 11 for a Premier Client🚀`
- **Note**: Title includes rocket emojis (🚀) at the start and end
- **No hyperlinks** in title

#### Description
Full text:

```
Exciting times at Supportiva as we recently wrapped up a seamless migration from Windows 10 to Windows 11 for one of our esteemed clients, upgrading a total of 36 devices!

This project was a significant milestone, reflecting our commitment to providing top-notch IT services and solutions.
```

- **2 paragraphs**
- **No bullet points**
- **Key details**: Windows 10 → Windows 11, 36 devices

#### Image
- **HAS IMAGE**: ✅ YES
- **Filename**: `windows 11 migration.jpeg`
- **Description**: Image showing a Windows 11 migration scene — possibly a laptop screen showing Windows 11 setup/installation, or a graphic showing the migration process
- **Rendered dimensions**: 379×225px
- **Crop parameters**: `x_41, y_0, w_1518, h_901`
- **Source URL**: `https://static.wixstatic.com/media/c1a3d4_3414daad6be047c5a545529da7fdbdcf~mv2.jpeg/v1/crop/x_41,y_0,w_1518,h_901/fill/w_379,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/windows%2011%20migration.jpeg`
- **Image position**: Right side of the text

---

## SECTION 4: FOOTER (Global — same on all pages)

### Layout
- **Background**: Dark (dark gray or dark blue)
- **Width**: Full viewport
- **Structure**: Multi-column layout

### Contents

#### Column 1 — Logo
- **Image**: `Supportiva.png` (same brand logo)
- **Dimensions**: 209×203px
- **Source URL**: `https://static.wixstatic.com/media/c1a3d4_97cb2d7a17384b06a328d6a4172ee707~mv2.png/v1/fill/w_209,h_203,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Supportiva.png`

#### Column 2 — Contact Info
- **Country label**: "USA"
- **Phone**: +1 724 906 3303
- **Email**: info@supportiva.net (mailto link)
- **Address line 1**: 30 N Gould St Ste 35742
- **Address line 2**: Sheridan
- **Address line 3**: WY 82801

#### Column 3 — Social Media
- **Label**: "Follow Us On:"
- **Icons** (each 25×25px with link):
  1. **Instagram** → `https://www.instagram.com/supportivanet/`
     - Icon URL: `https://static.wixstatic.com/media/11062b_55e4be1e75564866b6c28290f9a9d271~mv2.png`
  2. **LinkedIn** → `https://www.linkedin.com/company/67696474/admin/feed/posts/`
     - Icon URL: `https://static.wixstatic.com/media/11062b_9e78da3320da497ab23ce28d738d388a~mv2.png`
  3. **Facebook** → `https://www.facebook.com/Supportiva/`
     - Icon URL: `https://static.wixstatic.com/media/11062b_2381e8a6e7444f4f902e7b649aa3f0ac~mv2.png`
  4. **X (Twitter)** → `https://twitter.com/Supportiva25`
     - Icon URL: `https://static.wixstatic.com/media/11062b_81cefb1bd2e2490d892a1cad5cc1cd8a~mv2.png`

#### Copyright
- **Text**: `© 2024 Supportiva.net`
- **Second line**: `All rights reserved.`

---

## IMAGE INVENTORY — ALL IMAGES ON THIS PAGE

| # | Type | Filename | Dimensions (rendered) | Format | Location on Page |
|---|------|----------|-----------------------|--------|-----------------|
| 1 | Navbar Logo | Supportiva.png | 209×209px | PNG | Top nav, far left |
| 2 | Hero Banner | Servers.jpg | 980×352px | JPG | Full-width hero |
| 3 | Project Photo | IMG_0372_edited.jpg | 379×225px | JPG | Project 1 (Nike) |
| 4 | Project Photo | it-support-1.jpg | 379×225px | JPG | Project 2 (L1 Support) |
| 5 | Project Photo | IMG_7878_HEIC.png | 379×225px | PNG | Project 3 (Cabling) |
| 6 | Project Photo | WhatsApp...21.54.24.jpeg | 379×225px | JPEG | Project 4 (Decommission) |
| 7 | Project Photo | IMG_1002_edited.png | 379×225px | PNG | Project 5 (PaloAlto) |
| 8 | Project Photo | Cisco Project.jpeg | 379×225px | JPEG | Project 6 (Network Upgrade) |
| 9 | Project Photo | IMG_7732_HEIC.png | 379×225px | PNG | Project 7 (Racking) |
| 10 | Project Photo | WIFI HEATMAP_edited.jpg | 379×225px | JPG | Project 8 (WiFi) |
| 11 | Project Photo | WhatsApp...22.21.41.jpeg | 379×225px | JPEG | Project 9 (Rental) |
| 12 | Project Photo | windows 11 migration.jpeg | 379×225px | JPEG | Project 10 (Win11) |
| 13 | Footer Logo | Supportiva.png | 209×203px | PNG | Footer |
| 14-17 | Social Icons | (Instagram, LinkedIn, Facebook, X) | 25×25px each | PNG | Footer |

---

## DESIGN & LAYOUT SPECIFICATIONS

### Color Palette (observed)
- **Background**: White (#FFFFFF) for main content area
- **Text**: Dark gray/black for body text
- **Headings**: Dark (likely #333 or #000)
- **Footer background**: Dark (charcoal/dark gray)
- **Footer text**: White/light gray
- **Links**: Default blue (for Nike LinkedIn link)

### Typography (observed from Wix defaults)
- **H1 ("Projects")**: Large, bold, likely sans-serif (Wix default could be Helvetica/Arial or a Google Font)
- **H2 (Project titles)**: Medium-large, bold, sans-serif
- **Body text**: Regular weight, sans-serif, ~14-16px
- **Bullet points**: Standard bullet character (•)

### Layout Grid
- **Content width**: ~980px (Wix standard container)
- **Project card layout**: Two-column — text takes roughly 60% width, image takes ~40% (379px)
- **All project images**: Uniform 379×225px (aspect ratio ~1.68:1)
- **Vertical spacing**: Generous whitespace between projects

### Responsive Behavior
- On mobile (Wix default): Columns stack vertically — image goes above or below text
- Navigation collapses into hamburger menu

---

## KNOWN ISSUES & TYPOS TO NOTE (for upgrade)

1. **"Paloalto"** should be **"Palo Alto"** (Project 5 title)
2. **"Paltoalto"** should be **"Palo Alto"** (Project 5 description)
3. **"a 60 servers"** should be **"60 servers"** (Project 7 description)
4. **Double space** before "PA-440" in Project 5 title
5. **Project 7 image is self-linked** to `/projects` (likely accidental)
6. **No dates** on any projects — reader can't tell when work was done
7. **No client names** on most projects (except Nike) — just "our client"
8. **Copyright says 2024** — should be updated
9. **Inconsistent capitalization**: "Network devices" vs "Network Devices"

---

## UPGRADE SUGGESTIONS FOR RECREATION

1. **Add project dates/years** to each card
2. **Add technology tags** (e.g., "Cisco", "Palo Alto", "Windows 11") as badges
3. **Add a filter/category system** (Infrastructure, Migration, Support, etc.)
4. **Fix all typos** listed above
5. **Add hover effects** on project cards (scale, shadow, etc.)
6. **Add a "View Details" button** per project for expanded case studies
7. **Add before/after photos** where available
8. **Improve image quality** — some are phone photos (WhatsApp)
9. **Add client testimonials** per project
10. **Add animated counter** for project stats (number of sites, devices, etc.)
11. **Consider a masonry/grid layout** instead of uniform stacked cards
12. **Add lazy loading** for images (performance)
