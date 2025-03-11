import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Segmented, SegmentedValue } from '@/components/ui/segmented';
import {
  QueryStringMap,
  useNavigatePage,
} from '@/hooks/logic-hooks/navigate-hooks';
import { Routes } from '@/routes';
import { EllipsisVertical, Save } from 'lucide-react';
import { useMemo } from 'react';
import { Outlet, useLocation } from 'umi';
import './styles.less';

export default function ChunkPage() {
  const { navigateToDataset, getQueryString, navigateToChunk } =
    useNavigatePage();
  const location = useLocation();

  const options = useMemo(() => {
    return [
      {
        label: 'Parsed results',
        value: Routes.ParsedResult,
      },
      {
        label: 'Chunk result',
        value: Routes.ChunkResult,
      },
      {
        label: 'Result view',
        value: Routes.ResultView,
      },
    ];
  }, []);

  const path = useMemo(() => {
    return location.pathname.split('/').slice(0, 3).join('/');
  }, [location.pathname]);

  return (
    <section className="chunkPage">
      <PageHeader
        title="Editing block"
        back={navigateToDataset(
          getQueryString(QueryStringMap.KnowledgeId) as string,
        )}
        className="pageHeader"
        titleStyle={{ color: '#0A3861', fontWeight: 600 }}
      >
        <div>
          <Segmented
            options={options}
            value={path}
            onChange={navigateToChunk as (val: SegmentedValue) => void}
            className="segmented text-colors-text-neutral-standard"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={'icon'}
            size={'icon'}
            className="iconButton"
          >
            <EllipsisVertical />
          </Button>
          <Button
            variant={'tertiary'}
            size={'sm'}
            className="saveButton"
          >
            <Save className="mr-2" />
            Save
          </Button>
        </div>
      </PageHeader>
      <Outlet />
    </section>
  );
}
