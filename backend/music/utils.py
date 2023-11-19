from functools import partial
from django.db import models
import hashlib
import os


def hash_file(file, block_size=65536):
    hasher = hashlib.md5()
    for buf in iter(partial(file.read, block_size), b""):
        hasher.update(buf)

    return hasher.hexdigest()


def upload_to(instance, filename):
    instance.image.open()
    filename_base, filename_ext = os.path.splitext(filename)
    return os.path.join(
        "images", "{0}.{1}".format(hash_file(instance.image), filename_ext)
    )
