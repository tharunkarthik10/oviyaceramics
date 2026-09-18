import cv2, os, glob
import numpy as np

tailes_dir = '/Users/a.v.tharunkarthik/Desktop/oviya/abc/react-app/src/tailes'
files = sorted(glob.glob(os.path.join(tailes_dir, '*.jpeg')) + glob.glob(os.path.join(tailes_dir, '*.jpg')))
out_dir = '/Users/a.v.tharunkarthik/Desktop/oviya/abc/react-app/public/tiles'
os.makedirs(out_dir, exist_ok=True)

# Define exact high-precision crop bounding boxes [x, y, w, h] for each image
# All crops will be resized to uniform vertical 600x1200 (1:2 aspect ratio)
crop_boxes = {
    # 1: 4065-DK / 4066-HL Digital Wall Tiles - Pure central decorative highlighter tile
    1: (60, 650, 618, 405),
    # 2: Luxe Cuba Selva - Slab is exactly at (91, 240, 491, 978)
    2: (91, 240, 491, 978),
    # 3: Supera Bianco Statuario - Slab is on left side (90, 75, 304, 604)
    3: (90, 75, 304, 604),
    # 4: Vizio Blue - Pure slab on left side
    4: (112, 338, 301, 601),
    # 5: Vibrato Royal Gold - Slab at (60, 127, 223, 441)
    5: (60, 127, 223, 441),
    # 6: Luxe Logan Grey - Slab at (304, 217, 472, 944)
    6: (304, 217, 472, 944),
    # 7: Scone Sky - Slab at (90, 38, 307, 609)
    7: (90, 38, 307, 609),
    # 8: Influencer Gold Onyx - Pure vertical slab on left (excluding icons and lower room mockup)
    8: (45, 59, 304, 604),
    # 9: Adreson Sapphire Blue - Pure vertical slab on left (excluding icons and lower room mockup)
    9: (92, 65, 303, 604),
    # 10: Oviya Calacatta Crema - Vertical slab on left
    10: (92, 81, 316, 626),
    # 11: Amazone Blue - Slab on left
    11: (90, 134, 304, 605),
    # 12: Silver Mist Slate - Vertical slab
    12: (196, 159, 256, 511),
    # 13: Jorden Black - Slab on left side
    13: (75, 225, 500, 1000),
    # 14: Goldwave Imperial - Slab in phone screenshot
    14: (184, 329, 375, 750),
    # 15: Evoke Beige - Slab at (65, 155, 258, 514)
    15: (65, 155, 258, 514),
    # 16: Rembo Aqva - Pure vertical slab on left
    16: (107, 339, 440, 880),
    # 17: Orabella Endless Sinuous - Slab on left side
    17: (44, 55, 319, 637),
    # 18: Mestrow Deep Blue - Pure vertical slab on left (excluding icons and lower room mockup)
    18: (94, 59, 318, 634),
    # 19: Spyker Sky Crystal - Slab at (45, 68, 315, 627)
    19: (45, 68, 315, 627),
    # 20: Alpha Jade Green - Pure vertical slab on left
    20: (91, 50, 303, 606),
    # 21: Eternal Fornk Blue - Pure vertical slab on right (excluding website text and lower room mockup)
    21: (174, 76, 255, 510)
}

TARGET_W, TARGET_H = 600, 1200

for i, f in enumerate(files):
    idx = i + 1
    img = cv2.imread(f)
    h, w, _ = img.shape
    
    box = crop_boxes.get(idx)
    if box:
        bx, by, bw, bh = box
        # Clip to image boundary
        bx = max(0, min(bx, w - 10))
        by = max(0, min(by, h - 10))
        bw = min(bw, w - bx)
        bh = min(bh, h - by)
        crop = img[by:by+bh, bx:bx+bw]
        # Resize to uniform 600x1200
        resized = cv2.resize(crop, (TARGET_W, TARGET_H), interpolation=cv2.INTER_LANCZOS4)
        out_path = os.path.join(out_dir, f'tile_{idx}.jpg')
        cv2.imwrite(out_path, resized, [cv2.IMWRITE_JPEG_QUALITY, 92])
        print(f'Saved tile_{idx}.jpg: cropped from {bw}x{bh} -> {TARGET_W}x{TARGET_H}')

