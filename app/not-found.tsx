import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/locales";

// Anything that escapes /[lang]/ (and isn't caught by middleware) lands here.
// Bounce to the default locale so visitors and crawlers always reach a
// canonical, locale-prefixed URL.
export default function RootNotFound(): never {
  redirect(`/${DEFAULT_LOCALE}`);
}
