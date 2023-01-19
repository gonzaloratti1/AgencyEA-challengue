import { Product } from "@/type";
import Link from "next/link";

type Props = {
  params: {
    category: string;
    page: string;
    order: string;
  };
};

const ProductsPage = async ({ params }: Props) => {
  let { products } = await import(`../../../../data/products.json`);

  products = products.filter(
    (product: Product) => String(product.sublevel_id) === params.category
  );

  products.sort((a: Product, b: Product) =>
    params.order === "asc"
      ? a.price.localeCompare(b.price)
      : b.price.localeCompare(a.price)
  );

  let productss = products.slice(
    Number(params.page) * 2,
    Number(params.page) * 2 + 2
  );


  return (
    <div className="flex flex-col gap-4">
      <nav className="flex gap-4">
        <Link href={`${params.category}/${params.page}/desc`}>Descending</Link>
        <Link href={`${params.category}/${params.page}/asc`}>Ascending</Link>
      </nav>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))" }}
      >
        {productss.map((product) => (
          <div className="border p-4" key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
      <nav>
        {Number(params.page) !== 0 && (
          <Link
            href={`/${params.category}/${Number(params.page) - 1}/${
              params.order
            }`}
          >
            ←
          </Link>
        )}
        {params.page}
        {/* {products.length} */}
        {Number(params.page) * 2 < products.length - 1 && (
          <Link
            href={`/${params.category}/${Number(params.page) + 1}/${
              params.order
            }`}
          >
            →
          </Link>
        )}
      </nav>
    </div>
  );
};

export default ProductsPage;
