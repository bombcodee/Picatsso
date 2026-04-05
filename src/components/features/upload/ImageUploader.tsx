'use client';

import { useCallback, useRef } from 'react';
import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { validateImageFile } from '@/services/storage';
import { config } from '@/lib/config';

export function ImageUploader() {
  const { images, setImages, sceneImage, setSceneImage } = usePicatssoStore();
  const catInputRef = useRef<HTMLInputElement>(null);
  const sceneInputRef = useRef<HTMLInputElement>(null);

  const handleCatFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      const result = validateImageFile(file);
      if (result.valid) newFiles.push(file);
      else errors.push(`${file.name}: ${result.error}`);
    });

    if (errors.length > 0) alert(errors.join('\n'));
    setImages([...images, ...newFiles].slice(0, config.upload.maxFiles));
  }, [images, setImages]);

  const handleSceneFile = useCallback((files: FileList | null) => {
    if (!files?.[0]) return;
    const result = validateImageFile(files[0]);
    if (result.valid) setSceneImage(files[0]);
    else alert(result.error);
  }, [setSceneImage]);

  const handleCatDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleCatFiles(e.dataTransfer.files);
  }, [handleCatFiles]);

  const handleSceneDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleSceneFile(e.dataTransfer.files);
  }, [handleSceneFile]);

  const removeCatImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 좌: 고양이 사진 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            📸 고양이 사진 <span className="text-muted-foreground font-normal">(최대 {config.upload.maxFiles}장)</span>
          </label>
          <div
            onDrop={handleCatDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => catInputRef.current?.click()}
            className="border-2 border-dashed border-[#4A90D9]/30 rounded-xl p-6 text-center cursor-pointer hover:border-[#4A90D9]/60 hover:bg-[#4A90D9]/5 transition-colors min-h-[140px] flex flex-col items-center justify-center"
          >
            <input
              ref={catInputRef}
              type="file"
              accept={config.upload.acceptedTypes.join(',')}
              multiple
              onChange={(e) => handleCatFiles(e.target.files)}
              className="hidden"
            />
            {images.length > 0 ? (
              <div className="flex gap-2 flex-wrap justify-center">
                {images.map((file, index) => (
                  <div key={`${file.name}-${index}`} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`고양이 ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border shadow-sm"
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); removeCatImage(index); }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive text-white rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {images.length < config.upload.maxFiles && (
                  <div className="w-20 h-20 border-2 border-dashed border-muted rounded-lg flex items-center justify-center text-muted-foreground text-xl">
                    +
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="text-2xl mb-1">📷</div>
                <p className="text-xs text-muted-foreground">특성 분석용</p>
                <p className="text-xs text-muted-foreground">드래그 또는 클릭</p>
              </>
            )}
          </div>
        </div>

        {/* 우: 장면 사진 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            🖼️ 장면 사진 <span className="text-muted-foreground font-normal">(선택)</span>
          </label>
          <div
            onDrop={handleSceneDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => sceneInputRef.current?.click()}
            className="border-2 border-dashed border-[#7BAE7F]/30 rounded-xl p-6 text-center cursor-pointer hover:border-[#7BAE7F]/60 hover:bg-[#7BAE7F]/5 transition-colors min-h-[140px] flex flex-col items-center justify-center"
          >
            <input
              ref={sceneInputRef}
              type="file"
              accept={config.upload.acceptedTypes.join(',')}
              onChange={(e) => handleSceneFile(e.target.files)}
              className="hidden"
            />
            {sceneImage ? (
              <div className="relative group">
                <img
                  src={URL.createObjectURL(sceneImage)}
                  alt="장면 사진"
                  className="w-20 h-20 object-cover rounded-lg border shadow-sm"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); setSceneImage(null); }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive text-white rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <div className="text-2xl mb-1">🖼️</div>
                <p className="text-xs text-muted-foreground">그림의 주제</p>
                <p className="text-xs text-muted-foreground">드래그 또는 클릭</p>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        💡 왼쪽은 고양이 특성 분석용, 오른쪽은 고양이가 바라보는 장면 (그림의 주제)
      </p>
    </div>
  );
}
