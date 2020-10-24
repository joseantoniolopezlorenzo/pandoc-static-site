CC = pandoc
source = src
dist = dist
sources := $(wildcard $(source)/*.md)
objects := $(patsubst %.md,%.html,$(subst $(source),$(dist),$(sources)))

.PHONY: convertir
convertir: $(objects)

$(dist)/%.html: $(source)/%.md
	$(CC) -d html -s $< -o $@

.PHONY: clean
clean:
	rm -f index.html

.PHONY: watch
watch: convertir
	./server.sh
