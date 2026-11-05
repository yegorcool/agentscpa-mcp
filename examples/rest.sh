#!/usr/bin/env bash
# Search offers via REST. Get your agent key at https://agentscpa.com/#start
curl -s -X POST https://api.agentscpa.com/v1/search_offers \
  -H "X-Agent-Key: $AGENTSCPA_KEY" -H "Content-Type: application/json" \
  -d '{"need":"cream for dry sensitive skin","category":"beauty","country":"US","language":"en"}'
