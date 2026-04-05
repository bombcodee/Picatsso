'use client';

import { useRef } from 'react';
import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { Textarea } from '@/components/ui/textarea';
import { validateImageFile } from '@/services/storage';

export function SceneInput() {
  const {
    sceneDescription, setSceneDescription,
    sceneImage, setSceneImage,
  } = usePicatssoStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (files: FileList | null) => {
    if (!files?.[0]) return;
    const result = validateImageFile(files[0]);
    if (result.valid) {
      setSceneImage(files[0]);
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">
          🎨 고양이가 지금 뭘 보고 있나요?
        </label>
        <p className="text-xs text-muted-foreground mb-2">
          고양이가 바라보는 장면이 그림의 주제가 돼요. 고양이의 눈으로 이 장면을 그립니다!
        </p>
        <Textarea
          value={sceneDescription}
          onChange={(e) => setSceneDescription(e.target.value)}
          placeholder="예: 창밖의 비 오는 거리를 바라보고 있어요 / 츄르를 뚫어지게 쳐다보고 있어요 / 집사가 퇴근하고 들어오는 현관문을 보고 있어요"
          rows={3}
          className="resize-none"
        />
      </div>

      {/* 장면 사진 (선택) */}
      <div>
        <label className="text-sm font-medium">
          장면 사진 <span className="text-muted-foreground font-normal">(선택 — 없으면 설명만으로 그려요)</span>
        </label>
        <div
          onClick={() => inputRef.current?.click()}
          className="mt-2 border border-dashed border-[#7BAE7F]/40 rounded-xl p-4 text-center cursor-pointer hover:border-[#7BAE7F]/70 hover:bg-[#7BAE7F]/5 transition-colors"
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => handleFile(e.target.files)}
            className="hidden"
          />
          {sceneImage ? (
            <div className="flex items-center justify-center gap-3">
              <img
                src={URL.createObjectURL(sceneImage)}
                alt="장면 사진"
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="text-left">
                <p className="text-sm">{sceneImage.name}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); setSceneImage(null); }}
                  className="text-xs text-destructive hover:underline"
                >
                  삭제
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-2xl mb-1">🖼️</div>
              <p className="text-xs text-muted-foreground">
                고양이가 보고 있는 장면 사진을 올려주세요
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
