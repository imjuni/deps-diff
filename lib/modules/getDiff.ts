import IDiff from 'lib/modules/interfaces/IDiff';
import { clean, coerce, diff as semverDiff, valid } from 'semver';

export default function getDiff({
  type,
  next,
  prev,
}: {
  type: IDiff['dependency'];
  next: Record<string, string>;
  prev: Record<string, string>;
}) {
  const addDependencies = Object.entries(next)
    .filter(([name]) => Object.keys(prev).includes(name) === false)
    .map(([name, version]) => {
      const cleaned = clean(coerce(version)?.version ?? '');
      return { name, version: cleaned };
    })
    .filter((dep): dep is { name: string; version: string } => valid(dep.version) != null)
    .map((dep) => {
      const diff: IDiff = {
        dependency: type,
        action: 'add',
        name: dep.name,
        next: dep.version,
        prev: prev[dep.name] ?? 'N/A',
        semver: undefined,
      };

      return diff;
    });

  // remove dependency
  const removeDependencies = Object.entries(prev)
    .filter(([name]) => Object.keys(next).includes(name) === false)
    .map(([name, version]) => {
      const cleaned = clean(coerce(version)?.version ?? '');
      return { name, version: cleaned };
    })
    .filter((dep): dep is { name: string; version: string } => valid(dep.version) != null)
    .map((dep) => {
      const diff: IDiff = {
        dependency: type,
        action: 'remove',
        name: dep.name,
        prev: dep.version,
        next: next[dep.name] ?? 'N/A',
        semver: undefined,
      };

      return diff;
    });

  // change dependency
  const changeDependencies = Object.entries(next)
    .filter(([name]) => Object.keys(prev).includes(name) === true)
    .map(([name, version]) => {
      const versionCleaned = clean(coerce(version)?.version ?? '');
      const prevVsersionCleaned = clean(coerce(prev[name])?.version ?? '');
      return {
        name,
        version: versionCleaned,
        prevVersion: prevVsersionCleaned,
      };
    })
    .filter(
      (dep): dep is { name: string; version: string; prevVersion: string | null } =>
        dep.version != null && dep.version !== '',
    )
    .filter(
      (dep): dep is { name: string; version: string; prevVersion: string } =>
        dep.prevVersion != null && dep.prevVersion !== '',
    )
    .filter((dep) => dep.version !== dep.prevVersion)
    .map((dep) => {
      const diff: IDiff = {
        dependency: type,
        action: 'change',
        name: dep.name,
        next: dep.version,
        prev: dep.prevVersion,
        semver: semverDiff(dep.version, dep.prevVersion) ?? undefined,
      };

      return diff;
    });

  return [...addDependencies, ...changeDependencies, ...removeDependencies];
}
