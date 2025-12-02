import Logo from '@/components/logo';
import PublicGuard from '@/components/server/PublicGuard';
import { Spinner } from '@/components/ui/spinner';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Suspense fallback={<Spinner className='mx-auto my-auto' />}>
      <PublicGuard>
        <div className='min-h-screen bg-linear-to-br from-slate-50 to-gray-100'>
          {/* Navigation */}
          <nav className='container mx-auto px-4 py-6 flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
              <Logo />
              <span className='text-2xl font-semibold'>Kartopu</span>
            </div>
            <div className='hidden md:flex items-center space-x-8'>
              <a
                href='#features'
                className='text-gray-600 hover:text-slate-700 transition-colors'
              >
                Özellikler
              </a>
              <a
                href='#pricing'
                className='text-gray-600 hover:text-slate-700 transition-colors'
              >
                Fiyatlandırma
              </a>
              <a
                href='#contact'
                className='text-gray-600 hover:text-slate-700 transition-colors'
              >
                İletişim
              </a>
              <a
                href='/dashboard'
                className='bg-slate-800 hover:bg-slate-900 text-white px-6 py-2 rounded-lg transition-colors'
              >
                Dashboard
              </a>
            </div>
          </nav>

          {/* Hero Section */}
          <section className='container mx-auto px-4 py-20 text-center'>
            <div className='max-w-4xl mx-auto'>
              <h1 className='text-6xl md:text-7xl font-bold text-gray-900 mb-6'>
                Yatırımlarınızı
                <span className='text-blue-700 block'>Profesyonel</span>
                Şekilde Yönetin
              </h1>
              <p className='text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed'>
                Gelişmiş analitik araçlar, gerçek zamanlı piyasa verileri ve
                yapay zeka destekli önerilerle portföyünüzü optimize edin.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center mb-16'>
                <a
                  href='/dashboard'
                  className='bg-slate-800 hover:bg-slate-900 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                >
                  Ücretsiz Başla
                </a>
                <button className='border-2 border-gray-300 hover:border-slate-700 text-gray-700 hover:text-slate-700 font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300'>
                  Demo İzle
                </button>
              </div>

              {/* Dashboard Preview */}
              <div className='relative max-w-5xl mx-auto'>
                <div className='bg-white rounded-2xl shadow-2xl p-8 border border-gray-100'>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                    <div className='bg-linear-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100'>
                      <h3 className='text-green-800 font-semibold text-lg mb-2'>
                        Toplam Değer
                      </h3>
                      <p className='text-3xl font-bold text-green-600'>
                        ₺2,847,392
                      </p>
                      <p className='text-sm text-green-600 mt-1'>
                        +12.3% bu ay
                      </p>
                    </div>
                    <div className='bg-linear-to-r from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-100'>
                      <h3 className='text-slate-800 font-semibold text-lg mb-2'>
                        Aktif Yatırım
                      </h3>
                      <p className='text-3xl font-bold text-slate-700'>24</p>
                      <p className='text-sm text-slate-600 mt-1'>
                        Farklı sektör
                      </p>
                    </div>
                    <div className='bg-linear-to-r from-blue-50 to-slate-50 p-6 rounded-xl border border-blue-100'>
                      <h3 className='text-slate-800 font-semibold text-lg mb-2'>
                        Aylık Getiri
                      </h3>
                      <p className='text-3xl font-bold text-slate-700'>%8.7</p>
                      <p className='text-sm text-slate-600 mt-1'>
                        Piyasa ortalaması
                      </p>
                    </div>
                  </div>
                </div>
                <div className='absolute -inset-1 bg-linear-to-r from-slate-600 to-gray-600 rounded-2xl blur opacity-20'></div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id='features' className='container mx-auto px-4 py-20'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-4'>
                Güçlü Özellikler
              </h2>
              <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                Profesyonel yatırımcılar için tasarlanmış, kurumsal düzeyde
                araçlar
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <div className='bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                <div className='w-14 h-14 bg-linear-to-r from-slate-500 to-slate-700 rounded-xl flex items-center justify-center mb-6'>
                  <span className='text-white text-2xl'>📈</span>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Gerçek Zamanlı Analiz
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Canlı piyasa verileri, teknik analiz araçları ve otomatik
                  uyarılar ile her zaman güncel kalın.
                </p>
              </div>

              <div className='bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                <div className='w-14 h-14 bg-linear-to-r from-gray-500 to-slate-600 rounded-xl flex items-center justify-center mb-6'>
                  <span className='text-white text-2xl'>🛡️</span>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Banka Seviyesi Güvenlik
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  256-bit SSL şifreleme, iki faktörlü kimlik doğrulama ve
                  güvenli veri depolama.
                </p>
              </div>

              <div className='bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                <div className='w-14 h-14 bg-linear-to-r from-blue-500 to-slate-600 rounded-xl flex items-center justify-center mb-6'>
                  <span className='text-white text-2xl'>📊</span>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Detaylı Raporlama
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Kapsamlı performans raporları, vergi optimizasyonu ve portföy
                  analizi araçları.
                </p>
              </div>

              <div className='bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                <div className='w-14 h-14 bg-linear-to-r from-slate-500 to-gray-600 rounded-xl flex items-center justify-center mb-6'>
                  <span className='text-white text-2xl'>🔄</span>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Otomatik Rebalancing
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Hedef alokasyonunuza göre otomatik portföy dengeleme ve
                  yeniden yapılandırma.
                </p>
              </div>

              <div className='bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                <div className='w-14 h-14 bg-linear-to-r from-gray-500 to-slate-700 rounded-xl flex items-center justify-center mb-6'>
                  <span className='text-white text-2xl'>📱</span>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Mobil Erişim
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  iOS ve Android uygulamaları ile her yerden portföyünüze erişim
                  ve işlem yapma imkanı.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className='container mx-auto px-4 py-20'>
            <div className='bg-linear-to-r from-slate-700 to-gray-700 rounded-3xl p-12 text-center text-white relative overflow-hidden'>
              <div className='relative z-10'>
                <h2 className='text-4xl font-bold mb-4'>
                  Yatırım Yolculuğunuza Başlayın
                </h2>
                <p className='text-xl opacity-90 mb-8 max-w-2xl mx-auto'>
                  Binlerce yatırımcının güvendiği platform ile portföyünüzü
                  profesyonel seviyeye taşıyın
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <a
                    href='/dashboard'
                    className='bg-white text-slate-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                  >
                    Hemen Başla - Ücretsiz
                  </a>
                  <button className='border-2 border-white text-white hover:bg-white hover:text-slate-700 font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300'>
                    Uzman Desteği Al
                  </button>
                </div>
              </div>
              <div className='absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-white opacity-10 rounded-full'></div>
              <div className='absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-white opacity-10 rounded-full'></div>
            </div>
          </section>

          {/* Footer */}
          <footer className='bg-gray-900 text-white'>
            <div className='container mx-auto px-4 py-12'>
              <div className='grid md:grid-cols-4 gap-8'>
                <div>
                  <div className='flex items-center space-x-2 mb-4'>
                    <Logo />
                  </div>
                  <p className='text-gray-400'>
                    Profesyonel yatırım takibi ve portföy yönetimi platformu
                  </p>
                </div>
                <div>
                  <h4 className='font-semibold mb-4'>Ürün</h4>
                  <ul className='space-y-2 text-gray-400'>
                    <li>
                      <a
                        href='#features'
                        className='hover:text-white transition-colors'
                      >
                        Özellikler
                      </a>
                    </li>
                    <li>
                      <a
                        href='#pricing'
                        className='hover:text-white transition-colors'
                      >
                        Fiyatlandırma
                      </a>
                    </li>
                    <li>
                      <a
                        href='/dashboard'
                        className='hover:text-white transition-colors'
                      >
                        Dashboard
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className='font-semibold mb-4'>Destek</h4>
                  <ul className='space-y-2 text-gray-400'>
                    <li>
                      <a
                        href='#'
                        className='hover:text-white transition-colors'
                      >
                        Yardım Merkezi
                      </a>
                    </li>
                    <li>
                      <a
                        href='#contact'
                        className='hover:text-white transition-colors'
                      >
                        İletişim
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='hover:text-white transition-colors'
                      >
                        API Dokümantasyonu
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className='font-semibold mb-4'>Şirket</h4>
                  <ul className='space-y-2 text-gray-400'>
                    <li>
                      <a
                        href='#'
                        className='hover:text-white transition-colors'
                      >
                        Hakkımızda
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='hover:text-white transition-colors'
                      >
                        Gizlilik Politikası
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='hover:text-white transition-colors'
                      >
                        Kullanım Şartları
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
                <p>&copy; 2024 PortfolioTrack. Tüm hakları saklıdır.</p>
              </div>
            </div>
          </footer>
        </div>
      </PublicGuard>
    </Suspense>
  );
}
