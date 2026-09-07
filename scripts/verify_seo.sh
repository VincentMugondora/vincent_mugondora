#!/bin/bash

# Array of critical URLs to test
URLS=(
  "https://vincentmugondora.com/"
  "https://vincentmugondora.com/about"
  "https://vincentmugondora.com/services"
  "https://vincentmugondora.com/ai-lab"
  "https://vincentmugondora.com/writing"
)

echo "Starting SEO Verification..."
echo "----------------------------------------"

for URL in "${URLS[@]}"; do
  echo "Testing: $URL"
  
  # 1. Check HTTP Status and Headers
  echo "=> Fetching headers (following redirects)..."
  curl -s -IL "$URL" | grep -iE "^HTTP/|^x-robots-tag:" 
  
  # Fetch HTML for meta tags analysis
  HTML=$(curl -sL "$URL")
  
  # 2. Extract Canonical Tag
  CANONICAL=$(echo "$HTML" | grep -io '<link rel="canonical" href="[^"]*"' | sed -n 's/.*href="\([^"]*\)".*/\1/p')
  if [ -z "$CANONICAL" ]; then
    echo "=> Canonical Tag: MISSING"
  else
    echo "=> Canonical Tag: $CANONICAL"
    if [ "$URL" == "$CANONICAL" ]; then
      echo "   [PASS] Canonical matches requested URL"
    else
      echo "   [FAIL] Canonical mismatch!"
    fi
  fi
  
  # 3. Extract Robots Meta Tag
  ROBOTS=$(echo "$HTML" | grep -io '<meta name="robots" content="[^"]*"' | sed -n 's/.*content="\([^"]*\)".*/\1/p')
  if [ -z "$ROBOTS" ]; then
    echo "=> Robots Meta: NOT SET (defaults to index, follow)"
  else
    echo "=> Robots Meta: $ROBOTS"
    if [[ "$ROBOTS" == *"noindex"* ]]; then
      echo "   [FAIL] Page is marked as noindex!"
    fi
  fi
  
  echo "----------------------------------------"
done

echo "Verification complete!"
