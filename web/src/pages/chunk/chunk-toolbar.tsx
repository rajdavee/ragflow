import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface ChunkToolbarProps {
  text: string;
}

export function ChunkToolbar({ text }: ChunkToolbarProps) {
  return (
    <div className="flex justify-between px-9 toolbar">
      <span className="text-3xl font-bold toolbarTitle">
        {text}
      </span>
      <div className="flex items-center gap-3">
        <Button
          variant={'icon'}
          size={'icon'}
          className="copyButton"
        >
          <Copy />
        </Button>
        <Button
          variant={'outline'}
          size={'sm'}
          className="exportButton"
        >
          Export
        </Button>
      </div>
    </div>
  );
}
