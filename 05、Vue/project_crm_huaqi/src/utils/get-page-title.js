import defaultSettings from '@/settings'

const title = defaultSettings.title || '华启天成(深圳)内部CRM系统'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}