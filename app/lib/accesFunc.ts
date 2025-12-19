export function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key !== "Enter") return;

  e.preventDefault();

  const form = e.currentTarget.form;
  if (!form) return;

  const elements = Array.from(form.elements) as HTMLElement[];
  const index = elements.indexOf(e.currentTarget);

  const next = elements[index + 1];
  if (next && typeof next.focus === "function") {
    next.focus();
  }
}
