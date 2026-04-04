'use client';

import { useCallback, useRef } from 'react';
import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { validateImageFile } from '@/services/storage';
import { config } from '@/lib/config';

export function ImageUploader() {
  const { images, setImages } = usePicatssoStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const newFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      const result = validateImageFile(file);
      if (result.valid) {
        newFiles.push(file);
      } else {
        errors.push(`${file.name}: ${result.error}`);
      }
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    const combined = [...images, ...newFiles].slice(0, config.upload.maxFiles);
    setImages(combined);
  }, [images, setImages]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">
        고양이 사진 (최대 {config.upload.maxFiles}장)
      </label>

      {/* 업로드 영역 */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-[#4A90D9]/30 rounded-xl p-8 text-center cursor-pointer hover:border-[#4A90D9]/60 hover:bg-[#4A90D9]/5 transition-colors"
      >
        <input
          ref={inputRef}
          type="file"
          accept={config.upload.acceptedTypes.join(',')}
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <div className="text-3xl mb-2">📷</div>
        <p className="text-sm text-muted-foreground">
          클릭하거나 사진을 드래그해서 올려주세요
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          JPEG, PNG, WebP · 최대 {config.upload.maxFileSizeMB}MB
        </p>
      </div>

      {/* 미리보기 */}
      {images.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {images.map((file, index) => (
            <div key={`${file.name}-${index}`} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`고양이 사진 ${index + 1}`}
                className="w-24 h-24 object-cover rounded-xl border shadow-sm"
              />
              <button
                onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        💡 사진과 설명을 함께 제공하면 더 정확한 분석 결과를 받을 수 있어요
      </p>
    </div>
  );
}
