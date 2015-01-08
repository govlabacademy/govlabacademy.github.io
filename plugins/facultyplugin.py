from cactus.plugin_base import CactusPluginBase
import os
import json

# file: plugins/mycustomplugin.py
class FacultyPlugin(CactusPluginBase):
	def templateContext(self, *args, **kwargs):
		data_folder = "%s/../data" % "/".join(os.path.abspath(__file__).split('/')[:-1])
		# we load the data and put it in a dictionary.
		data = json.load(open("%s/cards.json" % data_folder))
		faculty = {}
		for people in data:
			people_id = people['name'].lower().replace(' ', '_') # lower case + space replaced by _.
			faculty[people_id] = people
		return faculty