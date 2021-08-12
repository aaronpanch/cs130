import { useRouter } from "next/router";
import ErrorPage from "next/error";
import ReactMarkdown from "react-markdown";

import { getCourseBySlug, listCourseSlugs } from "../../lib/api";

export default function Course({ course }) {
  const router = useRouter();

  if (!router.isFallback && !course?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return <ReactMarkdown>{course.content}</ReactMarkdown>;
}

export async function getStaticProps({ params }) {
  const course = await getCourseBySlug(params.slug);
  return { props: { course } };
}

export async function getStaticPaths() {
  const courses = await listCourseSlugs();

  return {
    paths: courses.map((slug) => {
      return { params: { slug } };
    }),
    fallback: false,
  };
}
