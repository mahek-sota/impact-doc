#!/bin/bash
response=$(curl -s https://impact-doc.vercel.app/api/views)

total=$(echo "$response" | grep -o '"totalViews":[0-9]*' | grep -o '[0-9]*')
echo "Total views: $total"
echo ""
echo "Visit log:"
echo "------------------------------------------------------------"
echo "$response" | grep -o '"timestamp":"[^"]*","referrer":"[^"]*","city":"[^"]*","country":"[^"]*"' | \
while IFS= read -r entry; do
  ts=$(echo "$entry"    | grep -o '"timestamp":"[^"]*"'  | cut -d'"' -f4)
  ref=$(echo "$entry"   | grep -o '"referrer":"[^"]*"'   | cut -d'"' -f4)
  city=$(echo "$entry"  | grep -o '"city":"[^"]*"'       | cut -d'"' -f4)
  country=$(echo "$entry" | grep -o '"country":"[^"]*"'  | cut -d'"' -f4)
  echo "$ts | $country, $city | $ref"
done
echo "------------------------------------------------------------"
