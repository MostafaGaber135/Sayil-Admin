# Sayil Admin — One‑Page Structure Guide

---

## 1) The main dashboard flow (Route → Layout → Shell → Pages)

```
app/[locale]/(dashboard)/layout.tsx   (Dashboard Layout)
   ├──► shared/lib/auth/guards.tsx        (اختياري: حماية الداشبورد — حاليًا متعطّل مؤقتًا)
   └──► shared/ui/AppShell/AppShell.tsx   (Shell ثابت: Topbar + Sidebar + Content)
           ├──► shared/ui/AppShell/AppTopbar.tsx
           │       ├──► shared/ui/LocaleSwitch.tsx       (تبديل اللغة / تغيير المسار)
           │       └──► shared/components/ui/*           (shadcn: Button/Sheet/Dropdown…)
           │
           ├──► shared/ui/AppShell/AppSidebar.tsx
           │       ├──► shared/config/navigation.ts      (NAV_ITEMS: عناصر السايدبار)
           │       └──► shared/ui/AppShell/NavItem.tsx   (active state + locale-aware href)
           │               └──► shared/lib/auth/rbac.ts  (اختياري: فلترة عناصر حسب permissions)
           │
           └──► children = pages inside (dashboard)
                   ├──► app/[locale]/(dashboard)/dashboard/page.tsx
                   ├──► app/[locale]/(dashboard)/users/page.tsx
                   ├──► app/[locale]/(dashboard)/listings/page.tsx
                   ├──► app/[locale]/(dashboard)/roles-permissions/page.tsx
                   └──► app/[locale]/(dashboard)/settings/page.tsx
```

**معنى ده للتيم:**  
- أي صفحة Dashboard جديدة = `page.tsx` تحت `(dashboard)`.  
- Topbar/Sidebar ثابتين من `AppShell`.  
- أي منطق auth/perms بيتحط في `shared/lib/auth`.

---

## 2) i18n (next-intl) — ليه عندنا `[locale]`؟

```
middleware.ts                 (next-intl middleware: يحدد اللغة من URL/cookie)
i18n/request.ts               (يحمّل messages من messages/{locale}.json)
app/[locale]/layout.tsx       (يثبت locale + NextIntlClientProvider)
messages/en.json + ar.json    (نصوص الترجمة)
```

**قواعد سريعة:**
- أي نص UI → key في `messages/*.json` (مش نص ثابت داخل الـUI).
- Client components: `useTranslations()`
- Server components: `getTranslations()` من `next-intl/server`
- Not Found:
  - `app/[locale]/not-found.tsx` لمسارات `/ar/...` و`/en/...`
  - `app/not-found.tsx` لمسارات بدون locale.

---

## 3) Data Layer (UI → Queries → API → Axios → Token)

```
features/<feature>/ui/*               (UI خاص بالـfeature)
   └──► features/<feature>/queries/*  (React Query hooks)
          └──► features/<feature>/api/*       (calls)
                 └──► shared/lib/axios/axios.instance.ts
                        └──► shared/lib/auth/token.ts     (Bearer token)
```

**قاعدة للتيم:**  
- ممنوع UI تعمل axios مباشرة.  
- أي endpoint: `features/<feature>/api`.  
- أي React Query hook: `features/<feature>/queries`.

---

## 4) State (Redux) + Providers

```
app/layout.tsx
   └──► shared/providers/Providers.tsx
          ├──► shared/lib/rtk/store.ts
          │       └──► features/auth/model/auth.slice.ts
          └──► shared/lib/react-query/queryClient.ts
```

**متى Redux ومتى React Query؟**
- Redux: حالة عامة (auth/user/permissions).
- React Query: بيانات السيرفر (lists/tables/dashboard).

---

## 5) UI layers (إيه الفرق بين shared/components/ui و shared/ui و features/ui؟)

- `shared/components/ui/*`  → shadcn primitives (Button, Sheet, DropdownMenu…)
- `shared/ui/*`             → components مركبة عامة (AppShell, LocaleSwitch, PageHeader…)
- `features/<feature>/ui/*` → UI خاص بميزة واحدة (UsersTable, RoleForm, ListingsFilters…)

**قاعدة ذهبية:**  
لو بيتكرر في أكتر من feature → انقله `shared/ui`.  
لو هو primitive من design system → `shared/components/ui`.  
لو خاص بميزة واحدة → `features/<feature>/ui`.

---

## 6) “نحط إيه فين؟” (Decision table سريع)

- Route/Page جديدة → `app/[locale]/(dashboard)/X/page.tsx`
- Component reusable عام → `shared/ui`
- UI primitive/design system → `shared/components/ui`
- API + Queries + UI لميزة معينة → `features/<feature>/...`
- Navigation items → `shared/config/navigation.ts`
- Auth/token/perms → `shared/lib/auth/*`
- Axios instance → `shared/lib/axios/axios.instance.ts`
- Translations → `messages/en.json` و `messages/ar.json`

---

### Status (حاليًا)
- Topbar/Sidebar + RTL/LTR متظبطين.
- AuthGuard متوقف مؤقتًا (حسب قرار الفريق لحد ما login/token يكتمل).
