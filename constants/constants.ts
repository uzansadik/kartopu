type BreadcrumbKey = keyof typeof breadcrumbList;

export const getBreadcrumbLabel = (pathname: string): string => {
  return breadcrumbList[pathname as BreadcrumbKey] || pathname;
};

export const breadcrumbList = {
  settings: 'Ayarlar',
  dashboard: 'Gösterge Paneli',
  profile: 'Profil',
  security: 'Güvenlik',
};
