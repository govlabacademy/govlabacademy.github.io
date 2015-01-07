# coding: utf-8
from cactus.utils import template_escape_path
import os
from cactus.context_processor_base import ContextProcessorBase


# file: context_processors/customcontext.py
class MyCustomContext(ContextProcessorBase):
    def context(self):
        return {
            "name": "World"
        }