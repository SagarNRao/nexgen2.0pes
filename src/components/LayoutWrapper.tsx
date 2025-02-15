// cognitium/src/components/LayoutWrapper.tsx
'use client'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="bg-black min-h-screen">{children}</div>
}
