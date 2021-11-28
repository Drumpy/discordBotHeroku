import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;

export async function addItem(text, tag) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
      },
    });
    console.log("Success! Entry added.");
  } catch (error) {
    console.error(error.body);
  }
}

export async function getDatabase() {
  const response = await notion.databases.query({ database_id: databaseId });

  // Get only checked items
  const responseResults = response.results.reduce((filtered, checked) => {
    const isChecked = checked.properties.Tags.checkbox;
    if (isChecked) {
      filtered.push(
        // id: checked.id,
        checked.properties.Name.title[0]?.plain_text
        // tags: checked.properties.Tags,
      );
    }
    return filtered;
  }, []);

  console.log(responseResults);

  return responseResults;
}
