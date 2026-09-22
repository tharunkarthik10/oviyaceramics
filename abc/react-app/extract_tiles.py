import cv2, os
import numpy as np

img_dir = '/Users/a.v.tharunkarthik/Desktop/oviya/abc/react-app/src/image'
public_tiles_dir = '/Users/a.v.tharunkarthik/Desktop/oviya/abc/react-app/public/tiles'
public_extracted_dir = '/Users/a.v.tharunkarthik/Desktop/oviya/abc/react-app/public/tiles_extracted'

os.makedirs(public_tiles_dir, exist_ok=True)
os.makedirs(public_extracted_dir, exist_ok=True)

files = sorted([f for f in os.listdir(img_dir) if f.endswith('.jpeg') or f.endswith('.jpg')])

TARGET_W, TARGET_H = 600, 800

def create_seamless_combo(img, x_range, y_blocks, target_w=TARGET_W, target_h=TARGET_H):
    x1, x2 = x_range
    slices = []
    for y1, y2 in y_blocks:
        sl = img[y1:y2, x1:x2]
        slices.append(sl)
    combo = np.vstack(slices)
    resized = cv2.resize(combo, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)
    return resized

def inpaint_white_labels(img, x_limit=80):
    mask = np.zeros(img.shape[:2], dtype=np.uint8)
    white_mask = (img[:, :x_limit, 0] > 200) & (img[:, :x_limit, 1] > 200) & (img[:, :x_limit, 2] > 200)
    kernel = np.ones((5, 5), np.uint8)
    white_mask_dilated = cv2.dilate(white_mask.astype(np.uint8), kernel)
    mask[:, :x_limit] = white_mask_dilated * 255
    inpainted = cv2.inpaint(img, mask, 7, cv2.INPAINT_TELEA)
    return inpainted

XRANGE = (61, 677)

tile_specs = [
    # 1: 3996 Azure Floral Vase Wall Tile
    {'file_idx': 0, 'tile_id': 22, 'type': 'combo', 'blocks': [(387, 594), (620, 1033), (1060, 1266)]},
    # 2: 4066 Sky & Ocean Swan Wall Tile
    {'file_idx': 1, 'tile_id': 23, 'type': 'combo', 'blocks': [(417, 623), (649, 1063), (1088, 1295)]},
    # 3: 4533 Ribbon Weave Floral Marble Wall Tile
    {'file_idx': 2, 'tile_id': 24, 'type': 'combo', 'blocks': [(365, 572), (599, 1012), (1037, 1244)]},
    # 4: 3610 Slate Linear Geometric Wall Tile
    {'file_idx': 3, 'tile_id': 25, 'type': 'combo', 'blocks': [(523, 729), (758, 1166), (1195, 1401)]},
    # 5: 3301 Bokeh Lilies & Butterflies Wall Tile
    {'file_idx': 4, 'tile_id': 26, 'type': 'combo', 'blocks': [(381, 588), (614, 1027), (1053, 1260)]},
    # 6: 4385 Royal Teaware & Citrus Kitchen Wall Tile
    {'file_idx': 5, 'tile_id': 27, 'type': 'combo', 'blocks': [(377, 583), (610, 816), (843, 1049), (1076, 1282)]},
    # 7: 4370 Rustic Timber Kitchen & Pantry Wall Tile
    {'file_idx': 6, 'tile_id': 28, 'type': 'combo', 'blocks': [(426, 632), (658, 865), (891, 1098), (1125, 1331)]},
    # 8: 12001 Hexagonal 3D Teaware Kitchen Wall Tile
    {'file_idx': 7, 'tile_id': 29, 'type': 'combo', 'blocks': [(280, 487), (513, 720), (746, 953), (979, 1186)]},
    # 9: 759 Botanical Hummingbird Elevation Tile
    {'file_idx': 8, 'tile_id': 30, 'type': 'crop_inpaint', 'crop': (394, 1011), 'inpaint_x': 80},
    # 10: 4533 Statuario Silverware Dining Wall Tile
    {'file_idx': 9, 'tile_id': 31, 'type': 'combo', 'blocks': [(366, 564), (588, 786), (811, 1009), (1034, 1231)]},
    # 11: 940 Lord Ganesha Sacred Temple Mural Elevation Tile
    {'file_idx': 10, 'tile_id': 32, 'type': 'crop', 'crop': (457, 1067)},
    # 12: 938 Golden Deer & Moonlit Forest Mural Elevation Tile
    {'file_idx': 11, 'tile_id': 33, 'type': 'combo', 'blocks': [(460, 1016), (1048, 1251)]},
    # 13: 719 Navy Interlocking Basketweave Elevation Tile
    {'file_idx': 12, 'tile_id': 34, 'type': 'crop', 'crop': (531, 1150)},
    # 14: 930 Stacked Stone & Emerald Slate Elevation Tile
    {'file_idx': 13, 'tile_id': 35, 'type': 'crop', 'crop': (711, 1329)},
    # 15: 937 Alpine Lake Village & Boat Mural Elevation Tile
    {'file_idx': 14, 'tile_id': 36, 'type': 'combo', 'blocks': [(462, 664), (697, 1306)]},
    # 16: 501 Geometric Relief Cubic Slate Elevation Tile
    {'file_idx': 15, 'tile_id': 37, 'type': 'crop', 'crop': (541, 1160)},
    # 17: 308 Autumn Maple Leaves Masonry Elevation Tile
    {'file_idx': 16, 'tile_id': 38, 'type': 'crop_inpaint', 'crop': (625, 1242), 'inpaint_x': 80}
]

print(f'Starting extraction for {len(tile_specs)} tiles...')

for spec in tile_specs:
    fname = files[spec['file_idx']]
    tile_id = spec['tile_id']
    img_path = os.path.join(img_dir, fname)
    img = cv2.imread(img_path)
    
    if spec['type'] == 'combo':
        result = create_seamless_combo(img, XRANGE, spec['blocks'])
    elif spec['type'] == 'crop':
        y1, y2 = spec['crop']
        sl = img[y1:y2, XRANGE[0]:XRANGE[1]]
        result = cv2.resize(sl, (TARGET_W, TARGET_H), interpolation=cv2.INTER_LANCZOS4)
    elif spec['type'] == 'crop_inpaint':
        y1, y2 = spec['crop']
        sl = img[y1:y2, XRANGE[0]:XRANGE[1]]
        cleaned = inpaint_white_labels(sl, x_limit=spec.get('inpaint_x', 80))
        result = cv2.resize(cleaned, (TARGET_W, TARGET_H), interpolation=cv2.INTER_LANCZOS4)
        
    # Save to public/tiles/
    out_file1 = os.path.join(public_tiles_dir, f'tile_{tile_id}.jpg')
    cv2.imwrite(out_file1, result, [cv2.IMWRITE_JPEG_QUALITY, 94])
    
    # Save to public/tiles_extracted/
    out_file2 = os.path.join(public_extracted_dir, f'tile_{tile_id}.jpg')
    cv2.imwrite(out_file2, result, [cv2.IMWRITE_JPEG_QUALITY, 94])
    
    print(f'Saved tile_{tile_id}.jpg from {fname} ({spec["type"]}) -> shape {result.shape}')

print('All 17 tiles extracted successfully with 0 errors!')
