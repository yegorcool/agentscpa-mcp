"""Any LLM with function calling: expose search_offers as a function and call the REST API."""
import json, os, requests

API = "https://api.agentscpa.com/v1"
HEADERS = {"X-Agent-Key": os.environ["AGENTSCPA_KEY"]}

# Tool definitions are generated from the same schemas the MCP server uses
spec = requests.get(f"{API}/openapi.json", timeout=10).json()
search = spec["paths"]["/v1/search_offers"]["post"]
TOOL = {
    "type": "function",
    "function": {
        "name": "search_offers",
        "description": search["description"],
        "parameters": search["requestBody"]["content"]["application/json"]["schema"],
    },
}

def search_offers(args: dict) -> str:
    r = requests.post(f"{API}/search_offers", json=args, headers=HEADERS, timeout=10)
    return r.json().get("text", "")

# Pass TOOL to your model; when it calls search_offers, return search_offers(arguments) as the tool result.
if __name__ == "__main__":
    print(json.dumps(TOOL, indent=2)[:400])
    print(search_offers({"need": "running shoes", "category": "fashion", "country": "GB", "language": "en"}))
