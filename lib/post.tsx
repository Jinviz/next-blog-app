import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');
console.log('process.cwd()', process.cwd());
// 경로 /Users/jinwoo/project/next-blog-app
console.log('postsDirectory', postsDirectory);
// 경로 /Users/jinwoo/project/next-blog-app/posts


export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    // fileNames [`pre-redering.md`, `ssr-ssg.md`]
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        // 경로 /Users/jinwoo/project/next-blog-app/posts/pre-redering
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section 
        const matterResult = matter(fileContents);
        // 객체화

        // Combine the data with the id
        return {
            id,
            ...(matterResult.data as {date: string; title: string})
        };
        // 반환문 중괄호 사용시 () 괄호 생략 가능
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
        return 1;
        } else {
        return -1;
        }
    });
}