from cactus.plugin_base import CactusPluginBase
import os
import json

# file: plugins/mycustomplugin.py
class MyCustomPlugin(CactusPluginBase):
	def templateContext(self, *args, **kwargs):
		data_folder = "%s/../data" % "/".join(os.path.abspath(__file__).split('/')[:-1])
		return {
    	"cards": json.load(open("%s/cards.json" % data_folder))
    }