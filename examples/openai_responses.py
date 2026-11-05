"""OpenAI Responses API with AgentsCPA as a remote MCP tool."""
import os
from openai import OpenAI

client = OpenAI()
MCP_URL = f"https://mcp.agentscpa.com/k/{os.environ['AGENTSCPA_KEY']}/mcp"

resp = client.responses.create(
    model="gpt-4.1-mini",
    input="My mom turns 60 and loves gardening. Gift ideas under $80? I live in Ohio.",
    tools=[{"type": "mcp", "server_label": "agentscpa", "server_url": MCP_URL, "require_approval": "never"}],
)
print(resp.output_text)
