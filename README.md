 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
new file mode 100644
index 0000000000000000000000000000000000000000..3bf3a449f826d84cbf64d7be215371a55a32bd67
--- /dev/null
+++ b/README.md
@@ -0,0 +1,17 @@
+# Research Data Finder
+
+A lightweight web app to help researchers quickly find relevant datasets.
+
+## Features
+
+- Keyword search across title, description, topic, and source
+- Topic and file-format filters
+- Responsive dataset cards with direct links
+
+## Run locally
+
+```bash
+python3 -m http.server 8000
+```
+
+Then open <http://localhost:8000>.
 
EOF
)
