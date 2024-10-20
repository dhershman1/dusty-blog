# Changelog

## 0.1.1

### Added

- New Dark mode
- This changelog for versioning
- New Create Post page
- New Auth Middleware to automatically validate routes and protect them
- Added date to posts
- New catch all route that will display 404s instead of "cannot GET" errors
- Markdown now supported for content, only rendered as html when viewing the full post

### Changed

- Changed app name from `Dusty Blog` to `NoteLoft`
- `posts` sql to use `timestamp` data type instead of `date`
- `my posts` are now sorted by `created_at` timestamp

### Removed

- Create Post no longer on the home page

### Fixed

- Pagination on My Posts still showing even if there was only one page

## 0.1.0

- Initial Release of Alpha site
