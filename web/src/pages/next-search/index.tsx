import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { useNavigatePage } from '@/hooks/logic-hooks/navigate-hooks';
import { EllipsisVertical } from 'lucide-react';

export default function SearchPage() {
  const { navigateToSearchList } = useNavigatePage();

  return (
    <section style={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <PageHeader
        back={navigateToSearchList}
        title="Search app 01"
        titleStyle={{ color: '#0A3861', fontWeight: 600 }}
        style={{
          borderBottom: '1px solid rgba(10, 56, 97, 0.1)',
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(10, 56, 97, 0.08)'
        }}
      >
        <div className="flex items-center gap-2">
          <Button
            variant={'icon'}
            size={'icon'}
            style={{
              color: '#0A3861',
              backgroundColor: 'rgba(10, 56, 97, 0.05)',
              '&:hover': {
                backgroundColor: 'rgba(10, 56, 97, 0.1)',
              }
            }}
          >
            <EllipsisVertical />
          </Button>
          <Button
            variant={'tertiary'}
            size={'sm'}
            style={{
              backgroundColor: '#A8232F',
              color: 'white',
              border: 'none',
              boxShadow: '0 2px 4px rgba(168, 35, 47, 0.2)',
              '&:hover': {
                backgroundColor: 'darken(#A8232F, 10%)',
              }
            }}
          >
            Publish
          </Button>
        </div>
      </PageHeader>
    </section>
  );
}
