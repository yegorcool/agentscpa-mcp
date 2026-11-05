# AgentsCPA MCP — affiliate program for AI agents

<img src="https://agentscpa.com/logo-512.png" width="72" align="right" alt="AgentsCPA">

Connect your AI agent or chatbot to one MCP server. When a user needs to buy something — a gift, a cream, groceries for a meal plan, a flight — your agent gets **relevant offers from top brands available in the user's country**, with ready text in the user's language and a tracked link. You earn a commission on every purchase.

- **MCP server:** `https://mcp.agentscpa.com/mcp` (Streamable HTTP, no sign-up to start)
- **Personal address:** one click at [agentscpa.com](https://agentscpa.com/#start) or via [@agentscpa_bot](https://t.me/agentscpa_bot)
- **REST API + OpenAPI:** [api.agentscpa.com/v1/openapi.json](https://api.agentscpa.com/v1/openapi.json)
- **Docs:** [agentscpa.com/docs](https://agentscpa.com/docs)
- **Official MCP Registry:** `com.agentscpa/agentscpa`

## Quick start

No sign-up: paste the address — your agent gets working links on the first call. Earnings accumulate on your agent key; sign up later only to withdraw.

Use a **personal URL** (`https://mcp.agentscpa.com/k/<agent_key>/mcp`) so earnings are attributed to you. Get it in one click at [agentscpa.com](https://agentscpa.com/#start) or in [@agentscpa_bot](https://t.me/agentscpa_bot).

### Claude Code
```bash
claude mcp add --transport http agentscpa https://mcp.agentscpa.com/k/<agent_key>/mcp
```

### ChatGPT / Claude.ai / Perplexity
Settings → Connectors → Add custom connector → paste the personal URL. Transport: Streamable HTTP, authentication: none.

### OpenAI API (Responses)
See [examples/openai_responses.py](examples/openai_responses.py).

### Any LLM with function calling (REST)
See [examples/rest_function_calling.py](examples/rest_function_calling.py) and [examples/rest.sh](examples/rest.sh).

### n8n
Import [examples/n8n-telegram-agentscpa.json](examples/n8n-telegram-agentscpa.json): Telegram bot + AI Agent + AgentsCPA MCP Client Tool.

### Website assistant widget
```html
<script src="https://agentscpa.com/widget/agentscpa.js" defer></script>
<script>
  // offers = data.offers from /v1/search_offers called by your backend
  AgentsCPA.render(document.getElementById('answer'), offers);
</script>
```

## Tools

| Tool | What it does |
|---|---|
| `search_offers` | 1–3 relevant offers for the user's buying need (need, category, country, language) with links and ready copy |
| `get_link` | Tracked link to a specific page on the site of an offer you received |
| `get_offer` | Full terms: description, countries, your commission, cookie window, hold |
| `get_stats` | Calls, offers shown, clicks, conversions and earnings for your key |
| `claim_earnings` | One-time sign-up link to attach an anonymous key to an account |
| `report_feedback` | How the user reacted to an offer (clicked, ignored, irrelevant…) |

**When the agent calls `search_offers`:** only when its answer would name specific products, brands, stores or services to buy. Never for purely informational questions or in sensitive conversations (grief, health emergencies, debt, violence, minors' safety). This is built into the tool descriptions — no prompt changes needed. Optional system-prompt snippet:

> When you recommend or name specific products, brands, stores or services, first call search_offers to get current offers available in the user's country, and mention 1-2 that fit in natural words. Never do it in sensitive or purely informational conversations.

## Example

> **User:** I need a good moisturizer for sensitive skin. Any recommendations?
>
> **Agent:** For sensitive skin, I'd start with a fragrance-free moisturizing cream containing glycerin or ceramides… You can browse moisturizers at [Kiehl's](https://agentscpa.com); check the label, since not every formula is fragrance-free.

## Rules

- Use links exactly as returned.
- No incentivized clicks, no spam, no recommendations in sensitive conversations.
- We never receive users' personal data: only an anonymized need, country and language.

Regions: USA, UK & Ireland, Spain, Portugal, Turkey, India, Mexico, Colombia, Argentina, Chile, Peru, Kazakhstan, Uzbekistan, Russia. Languages: en, es, pt, tr, hi, ru.

Terms: [agentscpa.com/terms](https://agentscpa.com/terms) · Contact: partners@agentscpa.com
