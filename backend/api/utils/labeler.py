from PIL import Image, ImageDraw, ImageFont

def label(image_path, bboxes):
    image = Image.open(image_path)
    draw = ImageDraw.Draw(image)
    width, height = image.size
    font = ImageFont.truetype("arial.ttf", 16)

    for bbox in bboxes:
        bbox_id = bbox["id"]
        x_center = (bbox["x"] * width) - 8
        y_center = (bbox["y"] * height) - 8

        text = str(bbox_id)
        draw.text((x_center, y_center), text, font=font, fill="black")

    image.save(image_path)
