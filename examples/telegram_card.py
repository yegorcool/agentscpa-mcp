"""Send an offer card to Telegram as-is (data.offers[i].render.telegram)."""
import os, requests

offers = requests.post("https://api.agentscpa.com/v1/search_offers",
                       json={"need": "stroller for a newborn", "category": "kids", "country": "ES", "language": "es"},
                       headers={"X-Agent-Key": os.environ["AGENTSCPA_KEY"]}, timeout=10).json()["data"]["offers"]
if offers:
    card = offers[0]["render"]["telegram"]
    requests.post(f"https://api.telegram.org/bot{os.environ['BOT_TOKEN']}/sendMessage",
                  json={"chat_id": os.environ["CHAT_ID"], **card}, timeout=10)
