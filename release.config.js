module.exports = {
  branches: ['+([0-9])?(.{+([0-9]),x}).x',
    'master',
    'next',
    'next-major',
    {name: 'beta', prerelease: true},
    {name: 'alpha', prerelease: true}],
  plugins: [
    ["@semantic-release/commit-analyzer",
      {
        preset: 'conventionalcommits',
        parserOpts: {
          mergePattern: '^Merged PR (\\d+): (\\w*)(?:\\(([\\w\\$\\.\\-\\* ]*)\\))?\\: (.*)$',
          mergeCorrespondence: ['id', 'type', 'scope', 'subject'],
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
        }
      }
      ],
    ["@semantic-release/release-notes-generator",
      {
        preset: 'conventionalcommits',
        parserOpts: {
          mergePattern: '^Merged PR (\\d+): (\\w*)(?:\\(([\\w\\$\\.\\-\\* ]*)\\))?\\: (.*)$',
          mergeCorrespondence: ['id', 'type', 'scope', 'subject'],
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
        },
        presetConfig: {
          commitUrlFormat: `${process.env.SYSTEM_COLLECTIONURI}${process.env.SYSTEM_TEAMPROJECT}/_git/${process.env.SYSTEM_TEAMPROJECT}/commit/{{hash}}`,
          compareUrlFormat: `${process.env.SYSTEM_COLLECTIONURI}${process.env.SYSTEM_TEAMPROJECT}/_git/${process.env.SYSTEM_TEAMPROJECT}/branchCompare?baseVersion=GT{{previousTag}}&targetVersion=GT{{currentTag}}&_a=commits`,
          issueUrlFormat: `${process.env.SYSTEM_COLLECTIONURI}${process.env.SYSTEM_TEAMPROJECT}/_workitems/edit/{{id}}`}
        // writerOpts: {
        //   finalizeContext: function(context, options, commits, keyCommit) {
        //     const parts = /(.*)\/_git\/(.*)/gm.exec(context.repository);
        //     return {
        //       ...context,
        //       repository: process.env.BUILD_REPOSITORY_NAME,
        //       repoUrl: process.env.BUILD_REPOSITORY_URI,
        //       commit: `_git/${parts[2]}/commit`,
        //       issue: '_workitems/edit'
        //     };
        //   },
        //   transform : (commit, context) => {
        //     commit.compareUrl = `https://dev.azure.com/{organization}/{project}/_git/{repository}?version=GB${commit.gitTag}&_a=compare&baseVersion=GB${context.previousTag || commit.gitTag}`;
        //     return commit
        //   }
        // }
      }],
    [
      "@semantic-release/npm",
      {
        npmPublish: false
      }
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "docs/CHANGELOG.md"
      }
    ],
    [
      "@semantic-release/git",
      {
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
        assets: [
          "docs/CHANGELOG.md",
          "package.json"
        ]
      }
    ]
  ]
}