import { BrandPortfolio } from '@/components/home/BrandPortfolio'
import { Categories } from '@/components/home/Categories'
import { CtaBanner } from '@/components/home/CtaBanner'
import { DistributionBrandsSlider } from '@/components/home/DistributionBrandsSlider'
import { GlobalPresence } from '@/components/home/GlobalPresence'
import { Hero } from '@/components/home/Hero'
import { Intro } from '@/components/home/Intro'
import { Packaging } from '@/components/home/Packaging'
import { PrivateLabel } from '@/components/home/PrivateLabel'
import { Seo } from '@/components/seo/Seo'
import { organizationJsonLd } from '@/content/jsonld'
import { pageMeta } from '@/content/seo'

export function HomePage() {
  return (
    <>
      <Seo
        title={pageMeta.home.title}
        description={pageMeta.home.description}
        jsonLd={organizationJsonLd}
      />
      <Hero />
      <Intro />
      <GlobalPresence />
      <Categories />
      <BrandPortfolio />
      <DistributionBrandsSlider />
      <PrivateLabel />
      <Packaging />
      <CtaBanner />
    </>
  )
}