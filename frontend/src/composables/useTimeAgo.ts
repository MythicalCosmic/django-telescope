import { ref, onMounted, onUnmounted } from 'vue'

export function useTimeAgo(dateStr: string) {
  const timeAgo = ref(formatTimeAgo(dateStr))
  let timer: ReturnType<typeof setInterval>

  onMounted(() => {
    timer = setInterval(() => {
      timeAgo.value = formatTimeAgo(dateStr)
    }, 10000)
  })

  onUnmounted(() => {
    clearInterval(timer)
  })

  return timeAgo
}

export function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = (now.getTime() - date.getTime()) / 1000

  if (diff < 5) return 'just now'
  if (diff < 60) return `${Math.floor(diff)}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString()
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString()
}
