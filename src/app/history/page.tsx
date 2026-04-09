'use client';

import { useEffect, useState, useCallback } from 'react';
import { artworkStorage } from '@/services/storage';
import type { SavedArtwork } from '@/services/storage';
import { useDownload } from '@/hooks/use-download';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function HistoryPage() {
  const [artworks, setArtworks] = useState<SavedArtwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState<SavedArtwork | null>(null);
  const { downloadSingle } = useDownload();

  const loadArtworks = useCallback(async () => {
    try {
      const data = await artworkStorage.getAll();
      setArtworks(data);
    } catch (error) {
      console.error('히스토리 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArtworks();
  }, [loadArtworks]);

  const handleDelete = async (id: string) => {
    await artworkStorage.delete(id);
    setArtworks((prev) => prev.filter((a) => a.id !== id));
    if (selectedArtwork?.id === id) setSelectedArtwork(null);
  };

  const handleDeleteAll = async () => {
    if (!confirm('모든 작업물을 삭제하시겠습니까?')) return;
    await artworkStorage.deleteAll();
    setArtworks([]);
    setSelectedArtwork(null);
  };

  /** 날짜별 그룹핑 */
  const grouped = artworks.reduce<Record<string, SavedArtwork[]>>((acc, artwork) => {
    const date = new Date(artwork.createdAt).toLocaleDateString('ko-KR', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(artwork);
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 max-w-6xl mx-auto w-full">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">작업물 라이브러리</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {artworks.length}개의 작업물
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="/"
              className="px-4 py-2 text-sm rounded-full border hover:bg-muted transition-colors"
            >
              새로 만들기
            </a>
            {artworks.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="px-4 py-2 text-sm rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
              >
                전체 삭제
              </button>
            )}
          </div>
        </div>

        {/* 로딩 */}
        {loading && (
          <div className="text-center py-20 text-muted-foreground">
            불러오는 중...
          </div>
        )}

        {/* 빈 상태 */}
        {!loading && artworks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🎨</p>
            <p className="text-lg font-medium mb-2">아직 작업물이 없어요</p>
            <p className="text-sm text-muted-foreground mb-6">
              고양이 그림을 생성하면 자동으로 여기에 저장됩니다
            </p>
            <a
              href="/"
              className="inline-block bg-[#4A90D9] hover:bg-[#2E5FA1] text-white px-6 py-3 rounded-full text-sm font-medium transition-colors"
            >
              첫 그림 만들러 가기
            </a>
          </div>
        )}

        {/* 날짜별 갤러리 */}
        {Object.entries(grouped).map(([date, items]) => (
          <div key={date} className="mb-10">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 border-b pb-2">
              {date}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {items.map((artwork) => (
                <div
                  key={artwork.id}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  <div className="aspect-square">
                    <img
                      src={artwork.imageBase64}
                      alt={artwork.style.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">{artwork.style.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {artwork.sceneDescription || '장면 없음'}
                    </p>
                  </div>
                  {/* 삭제 버튼 */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(artwork.id); }}
                    className="absolute top-2 right-2 w-6 h-6 bg-black/50 hover:bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 상세 모달 */}
        {selectedArtwork && (
          <div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => setSelectedArtwork(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* 이미지 */}
                <div className="rounded-xl overflow-hidden mb-4">
                  <img
                    src={selectedArtwork.imageBase64}
                    alt={selectedArtwork.style.name}
                    className="w-full"
                  />
                </div>

                {/* 메타 정보 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{selectedArtwork.style.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {new Date(selectedArtwork.createdAt).toLocaleString('ko-KR')}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {selectedArtwork.style.characteristics}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="font-medium text-xs text-muted-foreground mb-1">성격 유형</p>
                      <p>{selectedArtwork.analysis.personalityType}</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="font-medium text-xs text-muted-foreground mb-1">기질</p>
                      <p>{selectedArtwork.analysis.temperament}</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3 col-span-2">
                      <p className="font-medium text-xs text-muted-foreground mb-1">장면 설명</p>
                      <p>{selectedArtwork.sceneDescription || '(없음)'}</p>
                    </div>
                  </div>

                  {/* 액션 */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => downloadSingle(selectedArtwork.imageBase64, `picatsso_${selectedArtwork.id}.png`)}
                      className="flex-1 bg-[#4A90D9] hover:bg-[#2E5FA1] text-white py-2.5 rounded-full text-sm font-medium transition-colors"
                    >
                      다운로드
                    </button>
                    <button
                      onClick={() => { handleDelete(selectedArtwork.id); }}
                      className="px-4 py-2.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-sm transition-colors"
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => setSelectedArtwork(null)}
                      className="px-4 py-2.5 rounded-full border hover:bg-muted text-sm transition-colors"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
