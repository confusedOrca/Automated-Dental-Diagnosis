from django.db import models

class Diagnosis(models.Model):
    image = models.ImageField(upload_to='images/', blank=False, null=False)
    mask = models.ImageField(upload_to='masks/', blank=False, null=False)

    def __str__(self):
        return f"Image: {self.image.name}\n Mask: {self.mask.name}"
