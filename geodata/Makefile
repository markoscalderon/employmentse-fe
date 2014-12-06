ll: us.json

clean:
	rm -rf -- us.json build

.PHONY: all clean

build/world_countries_boundary_file_world_2002.shp: build/world_countries_boundary_file_world_2002.zip
	unzip -od $(dir $@) $<
	touch $@

build/countries.json: build/world_countries_boundary_file_world_2002.shp solrdata.csv
	../node_modules/.bin/topojson \
		-o $@ \
		--id-property='Country Name,Id2' \
		--external-properties=solrdata.csv \
		--properties='name=Country Name,population=+d.properties["jobs"]' \
		--projection='width = 960, height = 600, d3.geo.mercator() \
			.scale(200) \
			.translate([width, height])' \
		--simplify=.5 \
		--filter=none \
		-- countries=$<
