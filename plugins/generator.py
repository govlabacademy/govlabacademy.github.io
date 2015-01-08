from cactus.plugin_base import CactusPluginBase
import os
import json


class generator(CactusPluginBase):
	def templateContext(self, *args, **kwargs):
		data_folder = "%s/../data" % "/".join(os.path.abspath(__file__).split('/')[:-1])
		return {
    	"cards": json.load(open("%s/cards.json" % data_folder))
    }

  	# "cards": json.load(open("%s/cards.json" % data_folder))
		# "courses": json.load(open("%s/courses.json" % data_folder))