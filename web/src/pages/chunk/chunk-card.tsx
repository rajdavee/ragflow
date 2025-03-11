import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Annoyed } from 'lucide-react';

interface ParsedPageCardProps {
  page: string;
  content: string;
}

export function ParsedPageCard({ page, content }: ParsedPageCardProps) {
  return (
    <Card className="parsedCard">
      <CardContent className="p-4">
        <p className="text-base cardTitle">{page}</p>
        <div className="text-lg mt-2 cardContent">
          {content}
        </div>
      </CardContent>
    </Card>
  );
}

interface ChunkCardProps {
  activated: boolean;
  content: string;
}

export function ChunkCard({ content }: ChunkCardProps) {
  return (
    <Card className="chunkCard">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <Annoyed className="cardIcon" />
          <div className="flex items-center space-x-2">
            <Switch className="switch" />
            <span className="switchLabel">Active</span>
          </div>
        </div>
        <div className="text-lg mt-2 line-clamp-4 content">
          {content}
        </div>
      </CardContent>
    </Card>
  );
}
