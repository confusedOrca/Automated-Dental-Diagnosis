
def summarize(bboxes):
    if not bboxes:
        return "No affected teeth detected."

    report = []
    
    for bbox in bboxes:
        tooth_id = bbox["id"]
        print(tooth_id)
        line = f"Tooth {tooth_id}:"
        total_pixels = bbox['tooth'] + bbox['stain'] + bbox['calculus'] + bbox['non carious lesion'] + bbox['cavity']
        
        for disease in ["stain", "calculus", "non carious lesion", "cavity"]:
            disease_pixels = bbox[disease]
            if disease_pixels > 0:
                percentage = (disease_pixels / total_pixels) * 100

                if percentage < 5:
                    severity = "Mild"
                elif 5 <= percentage < 10:
                    severity = "Moderate"
                else:
                    severity = "Severe"
                
                line += f" {disease.capitalize()} ({severity})"
        
        report.append(line)
    
    print("Severity calculation done")
    return "\n".join(report)