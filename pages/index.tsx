import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import homeStyles from "@/styles/Home.module.css";
import { getSortedPostsData } from "@/lib/post";
import { GetStaticProps } from "next";
import Link from "next/link";

const Home = ({allPostsData}: // Props를 중괄호로 감싸줬기 때문에 타입 선언도 중괄호로 감싸서 props의 이름을 다시 명시적으로 선언해줘야한다. 
	{ allPostsData: 
		{
		date: string 
		title: string
		id: string
		}[] 
	}
	) =>{
	return (
		<div className={homeStyles.container}>
			<Head>
				<title>Next-Blog-App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section className={homeStyles.headingMd}>
				<p>[Your Self Introduction]</p>
				<p>
				(This is a website)
				</p>
			</section>
			<section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
				<h2 className={homeStyles.headingLg}>Blog</h2>
				<ul className={homeStyles.list}>
					{allPostsData.map(({id, date, title}) => (
						<li className={homeStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>
								{title}
							</Link>
							<br />
							<small className={homeStyles.lightText}>
								{date}
							</small>
						</li>
					))}
				</ul>
			</section>

		</div>
	);
}
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
	props: {
		allPostsData
	}
  }
}