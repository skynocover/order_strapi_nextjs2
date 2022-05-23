import { getProductSlugs, getProduct } from "@/lib/shopify";
import ProductSection from "@/components/ProductSection";
import { getProducts } from "../index";

function ProductPage({ productData }) {
  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <ProductSection productData={productData} />
    </div>
  );
}

export async function getStaticPaths() {
  const products = await getProducts();

  const productSlugs = products.map((item) => {
    return {
      node: { handle: item.node.handle },
      edges: item.node.variants.edges,
    };
  });
  // console.table(productSlugs);

  // const productSlugs = [
  //   {
  //     node: {
  //       handle: "dump",
  //     },
  //     edges: [{ node: { id: 123, price: 100, title: "title" } }],
  //   },
  //   {
  //     node: {
  //       handle: "friedDump",
  //     },
  //     edges: [
  //       { node: { id: 123, price: 100, title: "edge1" } },
  //       { node: { id: 123, price: 1234, title: "edge2" } },
  //     ],
  //   },
  // ];
  // // const productSlugs = await getProductSlugs();

  const paths = productSlugs.map((slug) => {
    const product = String(slug.node.handle);
    return {
      params: { product },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const products = await getProducts();
  const productData = products
    .filter((item) => {
      if (item.node.handle === params.product) {
        return true;
      }
    })
    .map((item) => {
      return {
        ...item.node,
      };
    })[0];

  // const productData = {
  //   id: 123,
  //   title: "dump",
  //   handle: "dump",
  //   description: "desc",
  //   variants: { edges: [{ node: { id: 123, price: 100, title: "title" } }] },
  //   images: {
  //     edges: [
  //       {
  //         node: {
  //           id: 1,
  //           originalSrc: "http://localhost:1337/uploads/2_fec749f9b0.png",
  //           height: 100,
  //           width: 120,
  //           altText: "",
  //         },
  //       },
  //     ],
  //   },
  // };

  return {
    props: {
      productData,
    },
  };
}

export default ProductPage;
