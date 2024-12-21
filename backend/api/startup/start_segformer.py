import torch
from transformers import SegformerFeatureExtractor, SegformerForSemanticSegmentation

def loadSegformerFeatureExtractor():
    feature_extractor = SegformerFeatureExtractor.from_pretrained("nvidia/segformer-b3-finetuned-ade-512-512")
    feature_extractor.do_reduce_labels = False
    feature_extractor.size = 256
    print("\n\nLoaded Segformer Feature Extractor")
    return feature_extractor

def loadSegformer():
    model = SegformerForSemanticSegmentation.from_pretrained(
                "nvidia/segformer-b3-finetuned-ade-512-512",
                return_dict=False,
                num_labels=6,
                id2label={0: 'background', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5'},
                label2id={'background': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5},
                ignore_mismatched_sizes=True,
            )
    model.load_state_dict(torch.load("media/models/model.pt", map_location="cpu"))
    print("\n\nLoaded Segformer")
    return model

def startSegformer():
    return loadSegformerFeatureExtractor(), loadSegformer()