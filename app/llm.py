from __future__ import annotations

from transformers import pipeline

MODEL_ID = "Qwen/Qwen2.5-0.5B-Instruct"
SYSTEM_PROMPT = "Answer briefly and factually in a Christian way."

_pipe = None


def get_pipe():
    global _pipe
    if _pipe is None:
        _pipe = pipeline("text-generation", model=MODEL_ID)
    return _pipe


def generate_reply(history: list[dict]) -> str:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + [
        {
            "role": "assistant" if h["role"] == "ai" else h["role"],
            "content": h["content"],
        }
        for h in history
    ]
    out = get_pipe()(
        messages,
        max_new_tokens=256,
        do_sample=True,
        temperature=0.7,
        top_p=0.9,
        return_full_text=False,
    )
    result = out[0]["generated_text"]
    if isinstance(result, list) and result:
        result = result[-1].get("content", "")
    return str(result).strip()
