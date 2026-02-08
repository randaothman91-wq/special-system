const datasets = [
  {
    title: "Global Climate Indicators",
    description: "Temperature, precipitation, and atmospheric trends from worldwide monitoring stations.",
    topic: "Climate",
    format: "CSV",
    source: "World Data Hub",
    url: "https://example.org/climate-indicators"
  },
  {
    title: "Open Health Survey 2025",
    description: "Demographics, nutrition, and public health outcomes from cross-country surveys.",
    topic: "Health",
    format: "JSON",
    source: "Public Health Open Data",
    url: "https://example.org/health-survey"
  },
  {
    title: "Urban Mobility Traces",
    description: "Aggregated transit usage and route-level travel times for major cities.",
    topic: "Transportation",
    format: "Parquet",
    source: "City Mobility Lab",
    url: "https://example.org/urban-mobility"
  },
  {
    title: "Crop Yield by Region",
    description: "Historical and seasonal crop output across soil and weather zones.",
    topic: "Agriculture",
    format: "CSV",
    source: "AgriStat",
    url: "https://example.org/crop-yield"
  },
  {
    title: "Earth Observation Tiles",
    description: "Satellite-derived land cover and water extent data with monthly updates.",
    topic: "Remote Sensing",
    format: "GeoTIFF",
    source: "Open Satellite Commons",
    url: "https://example.org/eo-tiles"
  },
  {
    title: "Education Outcomes Explorer",
    description: "District-level learning metrics, school resources, and enrollment changes.",
    topic: "Education",
    format: "XLSX",
    source: "Learning Atlas",
    url: "https://example.org/education-outcomes"
  }
];

const searchInput = document.getElementById("searchInput");
const topicFilter = document.getElementById("topicFilter");
const formatFilter = document.getElementById("formatFilter");
const datasetGrid = document.getElementById("datasetGrid");
const resultCount = document.getElementById("resultCount");
const cardTemplate = document.getElementById("datasetCardTemplate");

function setOptions(selectElement, options) {
  for (const option of options) {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    selectElement.append(optionElement);
  }
}

function initializeFilters() {
  const topics = [...new Set(datasets.map((item) => item.topic))].sort();
  const formats = [...new Set(datasets.map((item) => item.format))].sort();

  setOptions(topicFilter, topics);
  setOptions(formatFilter, formats);
}

function matchQuery(item, query) {
  if (!query) {
    return true;
  }

  const searchableText = [item.title, item.description, item.topic, item.source]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query.toLowerCase());
}

function renderDatasets() {
  const query = searchInput.value.trim();
  const topic = topicFilter.value;
  const format = formatFilter.value;

  const filtered = datasets.filter((item) => {
    const topicMatch = topic === "all" || item.topic === topic;
    const formatMatch = format === "all" || item.format === format;
    return topicMatch && formatMatch && matchQuery(item, query);
  });

  datasetGrid.innerHTML = "";

  if (!filtered.length) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty";
    emptyState.textContent = "No datasets matched your search. Try widening your filters.";
    datasetGrid.append(emptyState);
    resultCount.textContent = "0 datasets found";
    return;
  }

  for (const item of filtered) {
    const fragment = cardTemplate.content.cloneNode(true);
    fragment.querySelector(".dataset-title").textContent = item.title;
    fragment.querySelector(".dataset-description").textContent = item.description;
    fragment.querySelector(".meta-topic").textContent = item.topic;
    fragment.querySelector(".meta-format").textContent = item.format;
    fragment.querySelector(".meta-source").textContent = item.source;

    const link = fragment.querySelector(".dataset-link");
    link.href = item.url;
    link.textContent = `Open ${item.format} dataset`;

    datasetGrid.append(fragment);
  }

  resultCount.textContent = `${filtered.length} dataset${filtered.length > 1 ? "s" : ""} found`;
}

initializeFilters();
renderDatasets();

searchInput.addEventListener("input", renderDatasets);
topicFilter.addEventListener("change", renderDatasets);
formatFilter.addEventListener("change", renderDatasets);
